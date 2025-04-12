import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonCompareComponent } from './components/pokemon-compare/pokemon-compare.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'detail/:name', component: PokemonDetailComponent },
  { path: 'compare', component: PokemonCompareComponent },
  { path: 'compare/:poke1/:poke2', component: PokemonCompareComponent } // 👈 Rota adicional
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
