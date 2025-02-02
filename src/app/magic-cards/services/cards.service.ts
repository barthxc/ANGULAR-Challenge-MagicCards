import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from 'src/environments/environments';
import { LoadingService } from './loading.service';
import { Card, CardsResponse } from '../interfaces/CardsResponse.internface';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private baseUrl = enviroments.baseUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  public total!: number;
  public count!: number;

  public cards!: Card[];
  public filterCards?: CardsResponse;

  getCards(): void {
    this.loadingService.setLoading(true);

    this.http
      .get<CardsResponse>(`${this.baseUrl}`, { observe: 'response' })
      .subscribe({
        next: (response) => {
          // console.log('TOTAL-COUNT', response.headers.get('Total-Count'));
          // console.log('PAGE-SIZE', response.headers.get('Page-Size'));
          this.cards = response.body!.cards;

          console.log(response.body);
        },
        error: (error) => {
          console.log('error');
        },
        complete: () => {
          this.loadingService.setLoading(false);
        },
      });
  }

  searchCards(name: string, color: string): void {}
}
