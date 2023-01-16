import { Component, OnInit, Input } from '@angular/core';
import { pokemon } from '../modelos/pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})
export class PokeCardComponent implements OnInit {

  @Input() pokemon?: pokemon;
  @Input() loadPokemon?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
