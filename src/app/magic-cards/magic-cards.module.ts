import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagicCardsRoutingModule } from './magic-cards-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';
import { CardsByIdPageComponent } from './pages/cards-by-id-page/cards-by-id-page.component';
import { SearchCardsFormComponent } from './components/search-cards-form/search-cards-form.component';
import { MagicsCardsLayoutComponent } from './layout/magics-cards-layout/magics-cards-layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './components/menu/menu.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LegalLeagueComponent } from './components/legal-league/legal-league.component';

@NgModule({
  declarations: [
    FooterComponent,
    CardsPageComponent,
    CardsByIdPageComponent,
    SearchCardsFormComponent,
    MagicsCardsLayoutComponent,
    LoadingComponent,
    MenuComponent,
    CardComponent,
    LegalLeagueComponent,
  ],
  imports: [CommonModule, MagicCardsRoutingModule, ReactiveFormsModule],
})
export class MagicCardsModule {}
