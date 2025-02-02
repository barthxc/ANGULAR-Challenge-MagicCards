import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: () =>
      import('./magic-cards/magic-cards.module').then(
        (m) => m.MagicCardsModule
      ),
  },
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'cards',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
