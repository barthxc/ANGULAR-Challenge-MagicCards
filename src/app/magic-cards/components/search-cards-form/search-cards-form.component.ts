import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card, Color } from '../../interfaces/CardsResponse.internface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'search-cards-form',
  templateUrl: './search-cards-form.component.html',
  styleUrls: ['./search-cards-form.component.css'],
})
export class SearchCardsFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private cardsService: CardsService) {}
  @Input() cards: Card[] = [];
  @Input() totalCount: string | null = '0';
  @Input() backupCards: Card[] = [];
  @Output() filteredCards = new EventEmitter<Card[]>();

  colors = Object.values(Color);

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
    this.myForm.valueChanges.subscribe((changes) => {
      this.cardsService
        .filterCards(this.myForm.value)
        .subscribe((filteredCards) => {
          this.filteredCards.emit(filteredCards);
        });
    });

    // this.myForm
    //   .get('name')!
    //   .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
    //   .subscribe(() => {
    //     console.log(this.myForm.value);
    //     //ejecución del filtrado
    //   });

    //! forma
    // .pipe(
    //   startWith(this.myForm.value), // Emite el valor inicial del formulario
    //   pairwise(), // Compara el valor anterior con el valor actual
    //   debounce(([previous, current]) => {
    //     // Aplica debounce solo si el valor de 'name' ha cambiado
    //     console.log(
    //       previous.name !== current.name
    //         ? 'ha cambiado y te meto timer'
    //         : 'busco de una'
    //     );
    //     return previous.name !== current.name ? timer(5000) : timer(0);
    //   })
    // )
  }

  searchCards() {
    this.cardsService
      .getCards(this.myForm.value, true)
      .subscribe(({ cards, totalCount }) => {
        this.cards = cards;
        this.totalCount = totalCount;
        this.filteredCards.emit(cards);
      });
  }

  reset(): void {
    this.myForm.reset({
      name: '',
      cmc: '',
      colorIdentity: '',
      order: '',
    });

    this.filteredCards.emit(this.backupCards);
  }
}
