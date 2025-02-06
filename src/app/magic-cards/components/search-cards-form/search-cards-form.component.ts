import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card, Color } from '../../interfaces/CardsResponse.internface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardsService } from '../../services/cards.service';
import { Filter } from '../../interfaces/Filter.interface';

@Component({
  selector: 'search-cards-form',
  templateUrl: './search-cards-form.component.html',
  styleUrls: ['./search-cards-form.component.css'],
})
export class SearchCardsFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private cardsService: CardsService) {}
  @Input() cards: Card[] = [];
  @Input() totalCount: string | null = '0';
  @Input() actualPage!: number;

  @Output() filters = new EventEmitter<Filter>();
  @Output() resetData = new EventEmitter();
  @Output() searchData = new EventEmitter<Filter>();
  @Output() paginationData = new EventEmitter<'prev' | 'next'>();

  public needApi: boolean = false;
  public colors = Object.values(Color);

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
    this.myForm.valueChanges.subscribe((changes) => {
      this.filters.emit(this.myForm.value);
    });
  }

  searchCards() {
    this.searchData.emit(this.myForm.value);
  }

  reset(): void {
    this.myForm.reset({
      name: '',
      cmc: '',
      colorIdentity: '',
      order: '',
    });

    this.resetData.emit();
  }

  pagination(action: 'prev' | 'next') {
    this.paginationData.emit(action);
    this.myForm.reset({
      name: '',
      cmc: '',
      colorIdentity: '',
      order: '',
    });
  }
}
