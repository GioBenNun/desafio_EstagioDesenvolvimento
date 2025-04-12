import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getAll(limit = 151): Observable<any> {
    return this.http.get(`${this.apiUrl}/?limit=${limit}`);
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getTwoPokemons(name1: string, name2: string): Observable<any[]> {
    return forkJoin([this.getPokemon(name1), this.getPokemon(name2)]);
  }
}
