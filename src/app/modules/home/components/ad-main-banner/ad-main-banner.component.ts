import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-ad-main-banner',
  templateUrl: './ad-main-banner.component.html',
  styleUrls: ['./ad-main-banner.component.scss']
})
export class AdMainBannerComponent implements OnInit {
  public images:Array<string> = [ ];
  public loading: boolean = true;
  constructor(private rest: RestService,
    public router: Router) { }

  ngOnInit() {
  }
  
}
