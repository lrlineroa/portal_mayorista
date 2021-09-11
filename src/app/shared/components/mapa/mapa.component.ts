import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Marcador } from './components/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  // lat = 4.643689;
  // lng = -74.1300806;

  _lat;
  _lng;
  _name;

  marcadores: Marcador[] = []

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set lat(value) {
    this._lat = value;
    console.log("latitud map: " + this._lat);
  };

  @Input()
  set lng(value) {
    this._lng = value;
    console.log("longitud map: " + this._lng);
  };

  @Input()
  set name(value) {
    this._name = value;
    console.log("nombre Producto map: " + this._name);
  };


  @Output() public location = new EventEmitter();



  CambiarMarcador(evento) {
    this.lat = evento.coords.lat;
    this.lng = evento.coords.lng;

    this.location.emit({ lat: evento.coords.lat, lng: evento.coords.lng });
  }


  GetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this._lat = position.coords.latitude;
        this._lng = position.coords.longitude;
        this.location.emit({ lat: this._lat, lng: this._lng });
      });
    }
  }



}
