import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() title: string = '';
  @Input() columns: { [key: string]: string } = {};
  @Input() items: any[];
  @Input() actions: string;

  constructor() { }

  ngOnInit() {
  }

}

export interface ListItemAction {
  callback: (event, item) => void;
  icon?: string;
  title?: string;
  color?: string;
}