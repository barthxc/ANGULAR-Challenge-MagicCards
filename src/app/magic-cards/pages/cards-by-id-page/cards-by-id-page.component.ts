import { ActivatedRoute } from '@angular/router';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { switchMap } from 'rxjs';
import { CardAndLanguage } from '../../interfaces/CardById.interface';
import {
  ForeignName,
  Language,
} from '../../interfaces/CardsResponse.internface';

@Component({
  templateUrl: './cards-by-id-page.component.html',
  styleUrls: ['./cards-by-id-page.component.css'],
})
export class CardsByIdPageComponent implements OnInit {
  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  public isLoading!: boolean;
  public card!: CardAndLanguage;
  public defaultLanguage!: ForeignName;
  public foreignNames!: ForeignName[];

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.cardsService.getCardById(id)))
      .subscribe((card) => {
        const englishForeingName: ForeignName = {
          name: card.name,
          text: card.text,
          imageUrl: card.imageUrl,
          language: Language.English,
          type: card.type,
        };

        card.foreignNames = [englishForeingName, ...card.foreignNames];

        this.foreignNames = card.foreignNames;

        const defaultLanguage = card.foreignNames!.find(
          (foreignName) => foreignName.language === Language.English
        );

        if (defaultLanguage) {
          this.defaultLanguage = defaultLanguage;
          this.card = {
            number: card.number,
            artist: card.artist,
            setName: card.setName,
            set: card.set,
            rarity: card.rarity,
            foreignName: defaultLanguage,
            legalities: card.legalities,
          };
        }
      });
  }

  selectLanguage(language: string) {
    const newLanguage = this.foreignNames.find(
      (foreignName) => foreignName.language === language
    );

    if (newLanguage) {
      this.card.foreignName = newLanguage;
    }
  }
}
