import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-compare',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-compare.component.html',
  styleUrls: ['./pokemon-compare.component.css']
})
export class PokemonCompareComponent implements OnInit {
  name1 = '';
  name2 = '';
  pokemons: string[] = [];
  pokemon1: any = null;
  pokemon2: any = null;
  total1 = 0;
  total2 = 0;
  winner: string = '';
  errorMessage = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getAll().subscribe((data: any) => {
      this.pokemons = data.results.map((p: any) => p.name);
    });
  }

  compare(): void {
    this.errorMessage = '';
    this.winner = '';
    this.pokemon1 = null;
    this.pokemon2 = null;

    if (!this.name1 || !this.name2) {
      this.errorMessage = 'Preencha os dois nomes corretamente.';
      return;
    }

    this.pokemonService
      .getTwoPokemons(this.name1.trim().toLowerCase(), this.name2.trim().toLowerCase())
      .subscribe({
        next: ([p1, p2]) => {
          this.pokemon1 = p1;
          this.pokemon2 = p2;

          this.total1 = p1.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);
          this.total2 = p2.stats.reduce((sum: number, s: any) => sum + s.base_stat, 0);

          this.winner =
            this.total1 > this.total2
              ? p1.name
              : this.total2 > this.total1
              ? p2.name
              : 'Empate';
        },
        error: () => {
          this.errorMessage = 'Pokémon não encontrado.';
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
