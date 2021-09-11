import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [CategoryService]
})
export class ProfileComponent implements OnInit {
  // Actualizar Contraseña
  public forma: FormGroup;
  token: any;
  // --

  user: any = {};
  latitudeMap: any = null;
  longitudeMap: any = null;

  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  documentTypes: any[] = [];

  UpdateUser(id: string) {
    if (1 !== 1) {
      console.log(this.user);
    } else {
      this.rest.put(`/users/${id}`, {
        body: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          first_surname: this.user.first_surname,
          last_surname: this.user.last_surname,
          gender: this.user.gender,
          birthdate: this.user.birthdate,
          telephone: this.user.telephone,
          description: this.user.description,
          schedule: this.user.schedule,
          // country_id: this.user.country_id,
          // state_id: this.user.state_id,
          // city_id: this.user.city_id,
          web: this.user.web,
        },
        ignoreMessage: true
      }).then(rest => {
        this.notification.NotificationExito('Usuario actualizado');
        this.ngOnInit();
      });
    }
  }

  // Subir iamgen
  fileToUpload: File = null;

  // handleFileInpasut(file: FileList) {
  //   this.fileToUpload = file.item(0);
  //   this.notification.NotificationInfo('Imagen seleccionada, por favor guadar los cambios', '', 6000);
  // }

  handleFileInput(file: FileList) {
    console.log(file[0].type);

    if (file[0].type === 'image/png' || file[0].type === 'image/jpeg') {
      this.fileToUpload = file.item(0);
      const form = new FormData();
      form.append('image', this.fileToUpload);
      form.append('_method', 'put');
      this.rest.post(`/users/${this.user.id}`, {
        body: form,
        ignoreMessage: false
      }).then(() => {
        this.notification.NotificationExito('Imagen actualizada correctamente', '', 6000);
        this.auth.getUser(this.auth.user.id);
        this.ngOnInit();
      });
    } else {
      this.notification.NotificationError('El formato no es correcto para la imagen de usuario', '', 6000);
    }

  }

  constructor(private rest: RestService, private notification: ToolsService, private formBuilder: FormBuilder, private service: CategoryService, private auth: AuthService) {
    this.token = auth.token;
    // this.rest.get('/rest/countries').then((data: any) => this.countries = data);
    // this.rest.get('/rest/states').then((data: any) => this.states = data);
    // this.rest.get('/rest/cities').then((data: any) => this.cities = data);
    // this.rest.get('/rest/documentTypes').then((data: any) => this.documentTypes = data);

  }

  Getlocation(e) {
    this.latitudeMap = e.lat;
    this.longitudeMap = e.lng;
    console.log("Loc a Guardar:", + this.latitudeMap, + this.longitudeMap);
  }

  UpdateProfileMap() {
    console.log(this.latitudeMap)
    console.log(this.longitudeMap)
    this.rest.put(`/users/${this.user.id}`, {
      body: { latitude: this.latitudeMap, longitude: this.longitudeMap },
      ignoreMessage: false
    }).then(() => {
    });
  }

  //Actualizar contraseña
  ActualizarContrasena(forma: NgForm) {
    console.log(forma.value);
    if (!forma.value.current_password || !forma.value.password_confirmation || !forma.value.password || !forma.value.email) {
      this.notification.NotificationInfo('Información no es valida', '', 0)
    } else {
      const data = forma.value
      this.rest.put(`/auth/change`, {
        body: data,
        ignoreMessage: false,
      }).then((res: any) => {
        this.auth.cleanSession();
      });
    }
  }

  async ngOnInit() {
    this.user = await this.auth.user;
    this.latitudeMap = parseFloat(this.user.latitude)
    this.longitudeMap = parseFloat(this.user.longitude)
    this.imgUrl;
    console.log(this.user);
  }

  get imgUrl() {
    const image = this.user.image && `${environment.apiUrl.replace(/\/api$/, '')}${this.user.image}`;
    return image || 'assets/img/pageAdmin/usuario.png';
  }
}
