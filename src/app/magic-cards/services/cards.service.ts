import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { LoadingService } from './loading.service';
import {
  Card,
  CardByIdResponse,
  CardsResponse,
  Color,
  Rarity,
} from '../interfaces/CardsResponse.internface';
import { Filter } from '../interfaces/Filter.interface';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private baseUrl = enviroments.baseUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  // public count!: number;
  // public filterCards!: Card[];
  private _needApi = new BehaviorSubject<boolean>(false);
  private cards: Card[] = [];

  needApi$ = this._needApi.asObservable();

  // getCards(): void {
  //   this.loadingService.setLoading(true);
  //   this.http
  //     .get<CardsResponse>(`${this.baseUrl}`, { observe: 'response' })
  //     .subscribe({
  //       next: (response) => {
  //         // console.log('TOTAL-COUNT', response.headers.get('Total-Count'));
  //         // console.log('PAGE-SIZE', response.headers.get('Page-Size'));

  //         const test = response.body!.cards.filter((cards) => {
  //           return cards.imageUrl ? true : false;
  //         });

  //         console.log(test);

  //         this.cards = response.body!.cards;
  //         this.toFilterCards = response.body!.cards;
  //         this._filteredCards.next(test);
  //       },
  //       error: (error) => {
  //         console.log('error');
  //       },
  //       complete: () => {
  //         this.loadingService.setLoading(false);
  //       },
  //     });
  // }

  // Observable<{cards:Card[], totalCount:string|null}>

  // getCardsWithImages(
  //   minCount: number = 100,
  //   page: number = 1,
  //   accumulatedCards: Card[] = []
  // ): Observable<{ cards: Card[]; totalCount: string | null }> {
  //   this.loadingService.setLoading(true);

  //   return this.http
  //     .get<CardsResponse>(`${this.baseUrl}?page=${page}`, {
  //       observe: 'response',
  //     })
  //     .pipe(
  //       map((response) => {
  //         const newCards = response.body!.cards.filter((card) =>
  //           card.imageUrl ? true : false
  //         );
  //         const updatedCards = [...accumulatedCards, ...newCards];
  //         const totalCount = response.headers.get('Total-Count');

  //         return { updatedCards, totalCount };
  //       }),
  //       switchMap(({ updatedCards, totalCount }) => {
  //         if (updatedCards.length >= minCount) {
  //           this.loadingService.setLoading(false);
  //           this.cards = updatedCards;
  //           return of({ cards: updatedCards, totalCount });
  //           //TODO: Filtrar el resultdo que es la suma de ambas peticiones para que solo devuelvan 100
  //         } else {
  //           return this.getCardsWithImages(minCount, page + 1, updatedCards);
  //         }
  //       })
  //     );
  // }

  getCards(
    filter: {
      name?: string;
      colorIdentity?: string;
      cmc?: string;
    } = {},
    isFiltered: boolean = false,
    minCount: number = 100,
    page: number = 1,
    accumulatedCards: Card[] = []
  ): Observable<{ cards: Card[]; totalCount: string | null }> {
    this.loadingService.setLoading(true);
    const { cmc = '', colorIdentity = '', name = '' } = filter;

    const sanitizeFilter = {
      name: name.trim() ? name.trim() : '',
      cmc: cmc ? cmc : '',
      colorIdentity: colorIdentity.trim() ? colorIdentity.trim() : '',
    };

    // encodeURIComponent para pasar parámetros seguros. Por ejemplo un texto con "&""
    return this.http
      .get<CardsResponse>(
        `${this.baseUrl}?page=${page}&name=${encodeURIComponent(
          sanitizeFilter.name
        )}&colorIdentity=${encodeURIComponent(
          sanitizeFilter.colorIdentity
        )}&cmc=${encodeURIComponent(sanitizeFilter.cmc)}`,
        { observe: 'response' }
      )
      .pipe(
        map((response) => {
          const newCards = response.body!.cards.filter((card) =>
            card.imageUrl ? true : false
          );
          const updatedCards = [...accumulatedCards, ...newCards];
          const totalCount = response.headers.get('Total-Count');
          if (response.body!.cards.length > 0) {
            this._needApi.next(false);
          }

          return { updatedCards, totalCount };
        }),
        switchMap(({ updatedCards, totalCount }) => {
          if (isFiltered) {
            this.loadingService.setLoading(false);
            this.cards = updatedCards;
            return of({ cards: updatedCards, totalCount });
          } else {
            if (updatedCards.length >= minCount) {
              this.loadingService.setLoading(false);
              this.cards = updatedCards;

              return of({ cards: updatedCards, totalCount });
            } else {
              return this.getCards(
                filter,
                false,
                minCount,
                page + 1,
                updatedCards
              );
            }
          }
        })
      );
  }

  getCardById(id: string): Observable<Card> {
    this.loadingService.setLoading(true);
    return this.http.get<CardByIdResponse>(`${this.baseUrl}${id}`).pipe(
      map((data) => {
        // if (!data.card) {
        //   this.loadingService.setLoading(false);
        //   //TODO : move to other page
        //   throw new Error('No card');
        // }

        // //transformación del data para la interface CardById
        // const englishLanguage: transformatedForeignName = {
        //   name: data.card.name,
        //   text: data.card.text,
        //   type: data.card.type,
        //   imageUrl: data.card.imageUrl ?? '',
        //   language: Language.English,
        // };

        // const foreignNames = data.card.foreignNames
        //   ? [...data.card.foreignNames, englishLanguage]
        //   : [englishLanguage];

        // const cardById: CardById = {
        //   artist: data.card.artist,
        //   number: data.card.number,
        //   foreignName: foreignNames,
        // };

        this.loadingService.setLoading(false);

        return data.card;
      })
    );
  }

  filterCards(filter: Filter): Observable<Card[]> {
    const { cmc, colorIdentity, name, order } = filter;

    //Creamos el orden correcto de ordenación:
    //! REVISAR - No aclarado :(
    const rarityOrder: Record<Rarity, number> = {
      [Rarity.BasicLand]: 0,
      [Rarity.Common]: 1,
      [Rarity.Uncommon]: 2,
      [Rarity.Rare]: 3,
      [Rarity.MythicRare]: 4,
      [Rarity.Special]: 5,
    };

    const filtered = this.cards.filter((card) => {
      const matchesName = name
        ? card.name.toLowerCase().startsWith(name.toLowerCase())
        : true;
      const matchesCmc = cmc ? card.cmc === Number(cmc) : true;
      const matchesColorIdentity = colorIdentity
        ? card.colorIdentity?.includes(colorIdentity as Color)
        : true;

      return matchesName && matchesCmc && matchesColorIdentity;
    });

    if (filtered.length === 0) {
      this._needApi.next(true);
    } else {
      this._needApi.next(false);
    }

    if (order) {
      //! REVISAR - No aclarado
      filtered.sort((a, b) => {
        const rarityA = rarityOrder[a.rarity as Rarity] ?? 0;
        const rarityB = rarityOrder[b.rarity as Rarity] ?? 0;

        return order === 'ASC' ? rarityA - rarityB : rarityB - rarityA;
      });
    }

    return of(filtered);
  }
}
