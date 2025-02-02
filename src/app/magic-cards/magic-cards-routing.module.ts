import { CardsByIdPageComponent } from './pages/cards-by-id-page/cards-by-id-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagicsCardsLayoutComponent } from './layout/magics-cards-layout/magics-cards-layout.component';
import { CardsPageComponent } from './pages/cards-page/cards-page.component';

const routes: Routes = [
  {
    path: '',
    component: MagicsCardsLayoutComponent,
    children: [
      {
        path: '',
        component: CardsPageComponent,
      },
      {
        path: ':id',
        component: CardsByIdPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagicCardsRoutingModule {}
