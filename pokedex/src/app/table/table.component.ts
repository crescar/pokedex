import { Component, OnInit } from '@angular/core';
import { ApiPokeService } from '../api-poke.service';
import { tablaPokemon } from '../modelos/tablaPokemon';
import { pokemon } from '../modelos/pokemon';
import { tablaResumen } from '../modelos/tablaResumen';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  loadData: boolean = false;
  pagina: number = 1;
  pokemonesPagina: number = 5;
  todosPokemons: number = 0;
  auxPokemones?: tablaPokemon[];
  pokemones?: tablaPokemon[];
  pokemon?: pokemon;
  loadPokemon: boolean = false;
  time?: any;
  busqueda: string = '';
  autoCompletado: tablaPokemon[] = [];
  tablaResumen: tablaResumen[] = [];
  auxTablaResumen: tablaResumen[] = [];
  paginaResumen: number = 1;
  todosResumen: number = 0;
  resumenesPagina: number = 5;
  

  constructor(private api: ApiPokeService) { }

  ngOnInit(): void {
    this.obtenerPokemones()
  }

  obtenerPokemones (){
    this.api.obtenerPokemones().subscribe(
     (res:any) => {
        this.auxPokemones= res.results;
        this.refrescarPokemones();
        this.generadorTablaResumen();
        this.loadData = true;
     },
      error => console.log(error)
    )
  }

  refrescarPokemones(){
    if(this.auxPokemones){
      this.todosPokemons = this.auxPokemones.length
      this.pokemones = this.auxPokemones.slice(
        (this.pagina - 1) * this.pokemonesPagina,
        (this.pagina - 1) * this.pokemonesPagina + this.pokemonesPagina
      )
    }
  }

  obtenerPokemon (url: string){
    this.loadPokemon = false
    this.api.obtenerPokemon(url).subscribe(
      (res: any) => {
        this.pokemon = {
          nombre: res.name,
          habilidades: res.abilities.map((ability:any) => ability.ability.name),
          imagen: res.sprites.front_default,
          altura: res.height*0.1,
          peso: res.weight*0.1,
          type: res.types.map((type:any)=> type.type.name),
          movimientos: res.moves.map((move:any)=> move.move.name),
          estadisticas: res.stats.map((stats:any)=>{
            return {
              base_estadistica: stats.base_stat,
              esfuerzo: stats.effort,
              nombre: stats.stat.name
            }
          })
        }
        this.loadPokemon = true;
      },
      error => console.log(error)
    )
  }

  buscarPokemon(){
    clearTimeout(this.time)
    this.obtenerPokemones()
    this.time = setTimeout(() => {
      this.auxPokemones = this.auxPokemones?.filter((pokemon)=> pokemon.name.toLowerCase().includes(this.busqueda.toLowerCase()))
      if(this.auxPokemones)
        this.autoCompletado = this.auxPokemones
      this.refrescarPokemones()
    }, 300);
  }

  autoCompletarBusqueda(pokemon: tablaPokemon){
    this.busqueda = pokemon.name
    this.obtenerPokemon(pokemon.url)
    this.autoCompletado = []
    this.auxPokemones = [pokemon]
    this.refrescarPokemones()
  }

  generadorTablaResumen(){
    if(this.tablaResumen.length == 0){
      const letras = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      letras.forEach((letra)=>{
        let cantidad = this.auxPokemones?.filter((pokemon) => pokemon.name.startsWith(letra)).length
        if(cantidad && cantidad > 0){
          this.auxTablaResumen.push({
            letra:letra.toUpperCase(),
            cantidad: cantidad
          })
        }else{
          this.auxTablaResumen.push({
            letra:letra.toUpperCase(),
            cantidad: 0
          })
        }
      })
      this.refrescarResumen()
    }
  }

  refrescarResumen(){
    this.todosResumen = this.auxTablaResumen.length
    this.tablaResumen = this.auxTablaResumen.slice(
      (this.paginaResumen - 1) * this.resumenesPagina,
      (this.paginaResumen - 1) * this.resumenesPagina + this.resumenesPagina
    )
  }
}
