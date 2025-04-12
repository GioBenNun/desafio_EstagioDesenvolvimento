import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe((data: any) => {
      this.pokemons = data.results;
      this.filteredPokemons = this.pokemons;
    });
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.search(value);
  }

  search(value: string): void {
    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  goToDetails(name: string): void {
    this.router.navigate(['/detail', name]);
  }
}
