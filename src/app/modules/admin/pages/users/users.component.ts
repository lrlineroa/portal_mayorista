import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RestService } from 'src/app/core/services/rest.service';
import { ToolsService } from 'src/app/core/services/tools.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  search: string;

  users: IUsers[] = [];
  constructor(private rest: RestService,
    private notification: ToolsService) { }

  // Configurar Tabla Users
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['index', 'name', 'email', 'mobile', 'updated_at', 'created_at', 'acciones'];
  dataSource: any;

  configPaginator() {
    this.paginator._intl.itemsPerPageLabel = "Usuarios por pagina";
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Previa';
    this.paginator._intl.firstPageLabel = "Primera Página";
    this.paginator._intl.lastPageLabel = "Última Página";
  }

  getUsers() {
    this.rest.get('/users').then((usersData) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = usersData.data;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    });
  }
  // Configurar Tabla Users Fin

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }



  // Delete User
  idUser: string;
  nameuser: string;
  capturaDelete(id: string, name: string) {
    this.idUser = id;
    this.nameuser = name;
  }

  deleteUser() {
    if (this.idUser) {
      this.rest.delete(`/users/${this.idUser}`, { ignoreMessage: true })
        .then((data) => {
          this.notification.NotificationExito(`Usuario ${this.nameuser} Eliminado.`, '', 6000);
          this.ngOnInit();
        });
    }
  }

  ngOnInit() {
    this.configPaginator();
    this.getUsers();
  }

}


export interface IUsers {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  updated_at: string;
  created_at: string;
}




