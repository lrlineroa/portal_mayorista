import { Component, OnInit } from '@angular/core';
import { FormConfig, FormAction, CustomSelectOptions } from 'src/app/modules/admin/components/form/form.component';
import { RestService } from 'src/app/core/services/rest.service';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/core/services/tools.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  search: string;

  // Caracteristicas
  keyTemplate: string;
  idTemplate: string;
  typeTemplate: string;
  idSubCategoria: string;

  listaForm = true;
  public caracteristicas: any[];
  public subCategories: any[];
  listActions: FormAction[] = [
    {
      icon: 'plus', title: 'Crear Caracteristica', color: '',
      callback: (values, form) => {
        if (!values.key || !values.category_id) {
          this.notification.NotificationInfo('Información no es valida', '', 4000)
        } else {
          this.rest.post('/store/categoryFeactures', {
            body: { key: values.key, category_id: values.category_id },
            ignoreMessage: false
          }).then(() => {
            this.listaForm = true;
            this.router.navigate(['/admin/configuration/template']);
            this.ngOnInit();
          })
            .catch(() => this.notification.NotificationError('Error', '', 4000));
        }
      },
    },
  ];
  listInputs: FormConfig = {
    controls: {
      key: {
        icon: 'tag', title: 'Caracteristica', placeholder: 'Caracteristica'
      },
      category_id: {
        icon: 'list-ul', title: 'Seleccionar Categoria', type: 'select',
        controlOptions: {
          options: []
        }
      }
    }
  };

  constructor(private router: Router, private rest: RestService, private notification: ToolsService) { }

  async ngOnInit() {

    this.caracteristicas = (await this.rest.get(`/store/categoryFeactures`)).data;

    this.subCategories = (await this.rest.get('/store/categories?wheres=[{"column": "category_id", "op":"!=","value":null}]')).data;
    (this.listInputs.controls['category_id'].controlOptions as CustomSelectOptions).options = this.subCategories.map(category => ({ value: category.id, text: category.name }));
  }


  // Update caracteristicas
  capturaUpdate(id: string, key: string, category_id: string) {
    this.keyTemplate = key;
    this.idTemplate = id;
    this.idSubCategoria = category_id;
  }
  UpdateTemplate() {
    this.rest.put(
      `/store/categoryFeactures/${this.idTemplate}`,
      {
        ignoreMessage: false,
        body: { key: this.keyTemplate, category_id: this.idSubCategoria }
      }).then(() => {
        this.ngOnInit();
      });
  }

  // Delete caracteristicas
  capturaDelete(id: string, key: string) {
    this.idTemplate = id;
    this.keyTemplate = key;
  }
  deleteTemplate() {
    if (this.idTemplate) {
      this.rest.delete(`/store/categoryFeactures/${this.idTemplate}`, { ignoreMessage: true })
        .then(() => {
          this.notification.NotificationExito('Caracteristica Eliminada.', '', 6000);
          this.ngOnInit();
        });
    }
  }

  displayedColumns: string[] = ['subCategory', 'Caracteristica', 'acciones'];
}
