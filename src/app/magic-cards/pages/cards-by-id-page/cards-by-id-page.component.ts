import { ActivatedRoute } from '@angular/router';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { map, switchMap } from 'rxjs';
import { Card } from '../../interfaces/CardsResponse.internface';

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
  public card!: Card;

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.cardsService.getCardById(id)))
      .subscribe((card) => {
        console.log(card.imageUrl);
        this.card = card;
      });
  }
}
