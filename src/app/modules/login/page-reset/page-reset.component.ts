import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { RestService } from 'src/app/core/services/rest.service';
import { format } from 'url';

@Component({
  selector: 'app-page-reset',
  templateUrl: './page-reset.component.html',
  styleUrls: ['./page-reset.component.scss']
})
export class PageResetComponent implements OnInit {
  token: any;
  public forma: FormGroup;
  constructor(private activate: ActivatedRoute, private rest: RestService, private router: Router) {


    this.activate.params
      .subscribe(parametros => {
        this.token = parametros.token;
      });

  }

  ngOnInit() {
  }



  FormReset(forma: NgForm) {
    console.log(forma.value);
    const data = forma.value
    this.rest.post(`/password/reset`, {
      body: data,
      ignoreMessage: false,
    }).then((res: any) => {
      this.router.navigate(['/login']);
    });
  }


}
