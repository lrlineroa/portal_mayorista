import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/core/services/rest.service';
import { FormConfig, FormAction } from 'src/app/modules/admin/components/form/form.component';
import { ToolsService } from 'src/app/core/services/tools.service';
import { environment, apiImagenesUrl } from 'src/environments/environment.prod';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  urlImgs: any;

  listaForm = true;
  search: string;


  // Category
  nameCat: string;
  idCat: string;
  DescriptionCat: string;

  categories: any;

  listActions: FormAction[] = [
    {
      icon: 'plus', title: 'Crear Categoria', color: '',
      callback: (values, form) => {
        if (!values.aname || !values.description) {
          this.notification.NotificationInfo('Información no es valida', '', 4000)
        } else {

          this.rest.post('/store/categories', {
            body: { name: values.aname, description: values.description, category_id: null, },
            ignoreMessage: false,
          }).then(() => {
            this.listaForm = true;
            this.router.navigate(['/admin/configuration/category']);
            this.ngOnInit();
          })
            .catch(() => this.router.navigate(['/admin/configuration']));
        }
      },
    },
  ];
  listInputs: FormConfig = {
    controls: {
      aname: {
        icon: 'tag', title: 'Nombre', placeholder: 'nombre'
      },
      description: {
        icon: 'file-o', title: 'Descripción', placeholder: 'descripción'
      },

    }
  };




  constructor(public router: Router, private rest: RestService, private notification: ToolsService) {
    this.urlImgs = apiImagenesUrl.url;
    console.log(this.urlImgs);
  }


  ngOnInit() {
    this.rest.get('/store/categories?wheres=[{"column": "category_id", "op":"=","value":null}]',
      { ignoreMessage: false }).then((data) => {
        this.categories = data.data;
        console.log(this.categories);
      });
  }


  // Update Category
  capturaUpdate(id: string, name: string, description: string) {
    this.nameCat = name;
    this.idCat = id;
    this.DescriptionCat = description;
  }
  UpdateCategory() {
    this.rest.put(
      `/store/categories/${this.idCat}`,
      {
        ignoreMessage: false,
        body: { name: this.nameCat, description: this.DescriptionCat }
      }).then(() => {
        this.ngOnInit();
      });
  }

  // Delete Category
  capturaDelete(id: string, name: string) {
    this.idCat = id;
    this.nameCat = name;
  }
  deleteCategory() {
    if (this.idCat) {
      this.rest.get(`/store/categories/${this.idCat}`)
        .then((data: any) => {
          console.log(data.data.sub_categories.length);
          if (data.data.sub_categories.length > 0) {
            this.notification.NotificationInfo('No se puede eliminar ya que tiene Sub-Categorias asociadas.', '', 6000);
          } else {
            this.rest.delete(`/store/categories/${this.idCat}`, { ignoreMessage: true })
              .then(() => {
                this.notification.NotificationExito('Categoria Eliminada.', '', 6000);
                this.ngOnInit();
              });
          }

        });
    }
  }

  // Imagenes 

  get imgUrl() {
    const image = this.categories.image && `${environment.apiUrl.replace(/\/api$/, '')}${this.categories.image}`;
    return image || 'assets/img/pageAdmin/usuario.png';
  }

  fileToUpload: File = null;

  handleFileInput() {

    this.notification.NotificationExito('Imagen seleccionada correctamente', '', 6000);
  }

  OnSubmit(id: string, file: FileList) {
    this.fileToUpload = file.item(0);
    const form = new FormData();
    form.append('image', this.fileToUpload);
    form.append('_method', 'put');
    console.log(form);
    this.rest.post(`/store/categories/${id}`, {
      body: form,
      ignoreMessage: true
    }).then(() => {
      this.notification.NotificationExito('Imagen actualizada correctamente', '', 6000);

      this.ngOnInit();
    });

  }


  // Table
  displayedColumns: string[] = ['image', 'name', 'description', 'sub-categorias', 'acciones'];

}
