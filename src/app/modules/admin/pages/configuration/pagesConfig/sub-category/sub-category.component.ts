import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormConfig, FormAction, CustomSelectOptions } from 'src/app/modules/admin/components/form/form.component';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  search: string;


  // Sub-Category
  nameSubCat: string;
  idSubCat: string;
  DescriptionSubCat: string;
  idCategoria: string;

  listaForm = true;
  public categories: any[];
  public subCategories: any[];
  listActions: FormAction[] = [
    {
      icon: 'plus', title: 'Crear Sub-Categoria', color: '',
      callback: (values, form) => {
        if (!values.aname || !values.description || !values.acategory_id) {
          this.notification.NotificationInfo('Información no es valida', '', 4000)
        } else {
          this.rest.post('/store/categories', {
            body: { name: values.aname, description: values.description, category_id: values.acategory_id },
            ignoreMessage: false
          }).then(() => {
            this.listaForm = true;
            this.router.navigate(['/admin/configuration/subCategory']);
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
      acategory_id: {
        icon: 'list-ul', title: 'Seleccionar Categoria', type: 'select',
        controlOptions: {
          options: []
        }
      }
    }
  };

  constructor(private router: Router, private rest: RestService, private notification: ToolsService) { }

  async ngOnInit() {
    this.subCategories = (await this.rest.get(`/store/categories?wheres=[{"column": "category_id", "op":"!=","value":null}]`)).data;
    this.categories = (await this.rest.get('/store/categories?wheres=[{"column": "category_id", "op":"=","value":null}]')).data;
    (this.listInputs.controls['acategory_id'].controlOptions as CustomSelectOptions).options = this.categories.map(category =>
      ({ value: category.id, text: category.name }));
  }


  // Update Sub-Category
  capturaUpdate(id: string, name: string, description: string, category_id: string) {
    this.nameSubCat = name;
    this.idSubCat = id;
    this.DescriptionSubCat = description;
    this.idCategoria = category_id;
  }
  UpdateSubCategory() {
    this.rest.put(
      `/store/categories/${this.idSubCat}`,
      {
        ignoreMessage: false,
        body: { name: this.nameSubCat, description: this.DescriptionSubCat, category_id: this.idCategoria }
      }).then(() => {
        this.ngOnInit();
      });

  }

  // Delete Sub-Category
  capturaDelete(id: string, name: string) {
    this.idSubCat = id;
    this.nameSubCat = name;
  }
  deleteSubCategory() {
    if (this.idSubCat) {
      this.rest.get(`/store/categories/${this.idSubCat}`)
        .then((subcategories: any) => {
          console.log(subcategories.data.category_feactures.length);
          if (subcategories.data.category_feactures.length > 0) {
            this.notification.NotificationInfo('No se puede eliminar ya que tiene caracteristias asociadas.', '', 6000);
          } else {
            this.rest.delete(`/store/categories/${this.idSubCat}`)
              .then(() => {
                this.notification.NotificationExito('Sub-Categoria eliminada.', '', 6000);
                this.ngOnInit();
              });
          }
        });
    }
  }

  displayedColumns: string[] = ['category', 'name', 'description', 'caracteristicas', 'acciones'];


}
