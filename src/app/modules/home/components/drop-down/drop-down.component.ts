import { Component, OnInit, Input } from '@angular/core';
export interface Hero {
  name: string;
}
@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  constructor() { }
  @Input() items!: any[];
  @Input() dropdownIsShown!: boolean;
  @Input() onClickItem!: any;

  ngOnInit() {
  }
  clickItem(payload:any) {
    this.onClickItem(payload);
  }

}
