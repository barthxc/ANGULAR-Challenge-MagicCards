import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { LoadingService } from '../../services/loading.service';
import { Card, CardsResponse } from '../../interfaces/CardsResponse.internface';

@Component({
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.css'],
})
export class CardsPageComponent implements OnInit {
  constructor(
    private cardsService: CardsService,
    private loadingService: LoadingService
  ) {}

  public cards!: CardsResponse;

  public isLoading: boolean = false;
  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.cardsService.getCards();
  }
}
