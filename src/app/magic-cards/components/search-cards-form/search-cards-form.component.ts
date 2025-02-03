import { Component, Input, OnInit } from '@angular/core';
import { Card, Color } from '../../interfaces/CardsResponse.internface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardsService } from '../../services/cards.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'search-cards-form',
  templateUrl: './search-cards-form.component.html',
  styleUrls: ['./search-cards-form.component.css'],
})
export class SearchCardsFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private cardsService: CardsService) {}
  @Input() cards: Card[] = [];
  @Input() totalCount: string | null = '0';

  colors = Object.values(Color);
  filteredCards: Card[] = [];

  public needApi: boolean = false;

  public myForm: FormGroup = this.fb.group({
    name: [''],
    colorIdentity: [''],
    cmc: [''],
    order: [''],
  });

  ngOnInit(): void {
    this.cardsService.needApi$.subscribe((needApi) => {
      this.needApi = needApi;
    });

    // Capturar el evento valueChanges
    this.myForm.valueChanges.subscribe(() => {
      this.cardsService.filterCards(this.myForm.value);
    });

    // this.myForm
    //   .get('name')!
    //   .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe(() => {
    //     console.log(this.myForm.value);
    //     //ejecución del filtrado
    //   });
  }

  reset(): void {
    this.myForm.reset({
      name: [''],
      colorIdentity: [''],
      cmc: [''],
      order: [''],
    });
  }
}
