import { Component, OnInit,Input } from '@angular/core';
import { apiImagenesUrl } from 'src/environments/environment.prod';
@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {
  @Input() category:any;
  public nullImage = "null";
  public imgDefault: any = '../../../../../assets/img/img_Default/default1.png'
  urlImgs: string;
  constructor() { }

  ngOnInit() {
    this.urlImgs = apiImagenesUrl.url;
  }

}
