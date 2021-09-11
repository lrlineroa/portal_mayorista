import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  toggleMenu = false
  message: string = '';
  constructor() { }

  ngOnInit() {
  }

  EnviarMessage() {
    console.log(this.message);
  }

}
