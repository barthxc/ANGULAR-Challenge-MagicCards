import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagicCardsRoutingModule } from './magic-cards-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CardsByIdPageComponent } from './pages/cards-by-id-page/cards-by-id-page.component';
import { SearchCardsFormComponent } from './components/search-cards-form/search-cards-form.component';
import { MagicsCardsLayoutComponent } from './layout/magics-cards-layout/magics-cards-layout.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    FooterComponent,
    CardsPageComponent,
    CardsByIdPageComponent,
    SearchCardsFormComponent,
    MagicsCardsLayoutComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MagicCardsRoutingModule
  ]
})
export class MagicCardsModule { }
