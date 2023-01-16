import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiPokeService {

  constructor(private htpp: HttpClient) { }

  obtenerPokemones(){
    return this.htpp.get('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20)')
  }
  obtenerPokemon(url: string){
    return this.htpp.get(url);
  }
}
