
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isArray } from 'util';
import { AuthService } from './auth.service';
import { PusherService } from './pusher.service';
import { RestService } from './rest.service';
import { DataPaginator } from '../api.types';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _notifications: Notification[] = [];
  public _unreads: number = 0;

  constructor(
    private router: Router,
    private rest: RestService,
    private pusher: PusherService,
    private auth: AuthService
  ) {
    this.load(true);
    this.pusher.bindToUser(this.auth.user, () => this.load());
  }

  async load(blockUI: boolean = false, pag: DataPaginator = { page: 1 }) {
    const paginator = JSON.stringify(pag || { page: 1 });
    const { data, pagination } = await this.rest.get('/auth/notifications', {
      params: { paginator }
    });
    if (pagination) this._unreads = (pagination as any).unreads as number;
    return (this._notifications = data || []);
  }

  async read(
    notifications: Notification | (Notification[]) = [],
    ignoreMessage = false
  ) {
    if (!notifications) return null;
    if (!isArray(notifications))
      notifications = [notifications] as Notification[];
    notifications = (notifications as Notification[]).map(n => n.id) as any;
    const response = await this.rest.put('/auth/notifications/read', {
      body: { notifications },
      ignoreMessage
    });
    this.load();
    return response;
  }

  async readAll(ignoreMessage = true) {
    return await this.read(this.pendings, ignoreMessage);
  }

  execute(notification: Notification) {
    const { type, data } = notification;
    let target: string = type
      .replace('App\\Notifications\\', '')
      .replace('Notification', '')
      .toLowerCase();
    const object: any = data.data[target];
    let id: number = object['id'] || object['code'];
    if (target === 'comment' && (object.model || '').trim() !== '') {
      target = (object.model || '').toLowerCase();
      id = object.target_id;
    }
    this.router.navigateByUrl(`crm/${target}/show/${id}`);
  }

  get unreads(): number {
    return this._unreads;
  }

  get pendings(): Notification[] {
    return this._notifications.filter(n => !n.read_at);
  }

  get all(): Notification[] {
    return this._notifications;
  }
}

export interface Notification {
  id: string;
  type: string;
  read_at: string;
  created_at: string;
  data: {
    title: string;
    message: string;
    icon?: string;
    data: object; // related objects
  };
}
