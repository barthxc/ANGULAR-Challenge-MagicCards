import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { LoadingService } from './loading.service';
import {
  Card,
  CardsResponse,
  Color,
} from '../interfaces/CardsResponse.internface';

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
  private toFilterCards: Card[] = [];

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

  getCardsWithImages(
    minCount: number = 100,
    page: number = 1,
    accumulatedCards: Card[] = []
  ): Observable<{ cards: Card[]; totalCount: string | null }> {
    this.loadingService.setLoading(true);

    return this.http
      .get<CardsResponse>(`${this.baseUrl}?page=${page}`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const newCards = response.body!.cards.filter((card) =>
            card.imageUrl ? true : false
          );
          const updatedCards = [...accumulatedCards, ...newCards];
          const totalCount = response.headers.get('Total-Count');

          return { updatedCards, totalCount };
        }),
        switchMap(({ updatedCards, totalCount }) => {
          if (updatedCards.length >= minCount) {
            this.loadingService.setLoading(false);
            return of({ cards: updatedCards, totalCount });
            //TODO: Filtrar el resultdo que es la suma de ambas peticiones para que solo devuelvan 100
          } else {
            return this.getCardsWithImages(minCount, page + 1, updatedCards);
          }
        })
      );
  }

  //TODO: Retornar los datos.
  //! Es mejor usar varios BehaviorSubcriber porque es demasiado verboso crear llamadas de un lado a otro con subscribers
  filterCards(filter: {
    name: string;
    colorIdentity: string;
    cmc: string;
    order: '' | 'ASC' | 'DESC';
  }): void {
    const { cmc, colorIdentity, name, order } = filter;

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
    }

    //TODO:  this._filteredCards.next(filtered);
  }

  searchCards(filter: {
    name: string;
    colorIdentity: string;
    cmc: string;
    order: '' | 'ASC' | 'DESC';
  }): void {}
}
