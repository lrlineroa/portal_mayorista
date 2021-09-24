import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-publicidad',
  templateUrl: './carousel-publicidad.component.html',
  styleUrls: ['./carousel-publicidad.component.scss']
})
export class CarouselPublicidadComponent implements OnInit {

  constructor() { }
  @Input() images!: any[];
  ngOnInit() {
  }

}
