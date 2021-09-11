import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/core/services/tools.service';
import { Router } from '@angular/router';
import { SingupService } from '../services/singup.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
  // Cargar selects
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documentTypes: any[] = [];
  repasswrod: '';
  // Cargar selects Fin

  //datos user
  user: any = {
    email: '',
    password: '',
    first_surname: '',
    first_name: '',
  }

  constructor(private notificationService: ToolsService, private router: Router, private singupService: SingupService, private auth: AuthService) {

  }

  ngOnInit() {
    // this.singupService.GetCountries().subscribe((data: any) => {
    //   console.log(data);
    //   this.countries = data;
    // });
    // this.singupService.GetStates().subscribe((data: any) => this.states = data);
    // this.singupService.GetCities().subscribe((data: any) => this.cities = data);
    // this.singupService.GetdocumentTypes().subscribe((data: any) => this.documentTypes = data);
  }

  async Singup() {

    if (!this.user.first_name || this.user.first_name === '') {

      this.notificationService.NotificationInfo(
        "Por favor digite el primer nombre",
        "Información",
        parseInt("3000", 10)
      );

    } else if (!this.user.first_surname || this.user.first_surname === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite el primer apellido",
        "Información",
        parseInt("3000", 10)
      );

    }
    // else if (!this.user.document_type_id || this.user.document_type_id === '') {
    //   this.notificationService.NotificationInfo(
    //     "Por favor seleccione el tipo de documento",
    //     "Información",
    //     parseInt("3000", 10)
    //   );

    // } else if (!this.user.document_number || this.user.document_number === '') {
    //   this.notificationService.NotificationInfo(
    //     "Por favor dijite el numero de documento",
    //     "Información",
    //     parseInt("3000", 10)
    //   );

    // }
    // else if (!this.user.country_id || this.user.country_id === '') {
    //   this.notificationService.NotificationInfo(
    //     "Por favor seleccione el pais",
    //     "Información",
    //     parseInt("3000", 10)
    //   );

    // }
    // else if (!this.user.state_id || this.user.state_id === '') {
    //   this.notificationService.NotificationInfo(
    //     "Por favor seleccione el estado",
    //     "Información",
    //     parseInt("3000", 10)
    //   );

    // }
    // else if (!this.user.city_id || this.user.city_id === '') {
    //   this.notificationService.NotificationInfo(
    //     "Por favor seleccione la ciudad",
    //     "Información",
    //     parseInt("3000", 10)
    //   );

    // }
    else if (!this.user.email || this.user.email === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite el correo",
        "Información",
        parseInt("3000", 10)
      );

    }
    else if (!this.user.password || this.user.password === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite la contraseña",
        "Información",
        parseInt("3000", 10)
      );

    }
    else if (!this.repasswrod || this.repasswrod === '') {
      this.notificationService.NotificationInfo(
        "Por favor digite la confirmación de la contraseña",
        "Información",
        parseInt("3000", 10)
      );

    } else if (this.user.password !== this.repasswrod) {
      this.notificationService.NotificationAdver(
        "La confirmacion de la contraseña no es igual",
        "Advertencia",
        parseInt("3000", 10)
      );

    } else {
      this.singupService.insertarNuevoUsuario(this.user).subscribe((res: any) => {
        if (res.status === 'success') {
          this.router.navigate(['/login']);
          this.notificationService.NotificationExito(
            "Por favor, confirmar correo electronico", "Usuario creado correctamente", 7000
          );
        }
      });
    }

  }


}
