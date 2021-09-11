import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class ToolsService {
  constructor(private toastr: ToastrService) { }

  show(config: ToastMessage) {
    const { type, message, title } = config;
    const timeOut = 2000;
    this.toastr[type](title, message, { timeOut });
  }

  ///

  NotificationExito(title: string, message?: string, time?: number) {
    this.toastr.success(title, message, {
      timeOut: time
    });
  }
  NotificationInfo(title: string, message?: string, time?: number) {
    this.toastr.info(title, message, {
      timeOut: time
    });
  }
  NotificationError(title: string, message?: string, time?: number) {
    this.toastr.error(title, message, {
      timeOut: time
    });
  }
  NotificationAdver(title: string, message?: string, time?: number) {
    this.toastr.warning(title, message, {
      timeOut: time
    });
  }
}

export interface ToastMessage {
  type: 'success' | 'info' | 'error' | 'warning';
  title: string;
  message: string;
}