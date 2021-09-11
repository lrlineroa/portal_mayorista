import { Injectable, OnDestroy } from '@angular/core';
import Pusher from 'pusher-js/dist/web/pusher';
import { Api } from '../config';
import { isNull } from 'util';
import { ToolsService } from './tools.service';

// @ts-ignore
Pusher.logToConsole = true;

@Injectable()
export class PusherService implements OnDestroy {
  protected socket;
  protected channels: { [name: string]: any };
  protected binds: {
    channel: string,
    event?: string,
    callback: (data?: any, event?: string) => void
  }[];

  constructor(private tools: ToolsService) {
  }

  public init() {
    this.socket = new Pusher(Api.config.pusher.key, {
      cluster: Api.config.pusher.cluster,
      forceTLS: true,
      encrypted: true,
      authEndpoint: Api.config.baseUrl + '/auth/pusher',
      auth: {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('_token')
        }
      }
    });
    this.channels = {};
    this.binds = [];
  }

  private __global(channel, event, data) {
    this.binds.forEach(bind => {
      if (bind.channel === channel && (bind.event === event || isNull(bind.event)))
        bind.callback(data, event);
    });
  }

  public getChannel(name: string) {
    if (!this.socket)
      this.init();
    let channel = this.channels[name];
    if (!channel) {
      channel = this.channels[name] = this.socket.subscribe(name);
      channel.bind_global((eventName, data) => {
        console.log(`%c Pusher Event received: '${eventName}'`, 'color: #6e3d50');
        this.__global(name, eventName, data);
      });
    }
    return channel;
  }

  public bindTo(channelName: string, eventName: string, callback: (data?: any, event?: string) => void) {
    let channel = this.getChannel(channelName);
    if (channel)
      this.binds.push({
        event: eventName,
        channel: channelName,
        callback: callback
      });
  }

  public bindToUser(user: any, callback?: (data?: any, event?: string) => void) {
    this.bindTo('private-App.Models.User.' + user.id, null, (data, event) => {
      if (event !== 'pusher:subscription_succeeded')
        this.tools.NotificationExito(data.title, '', 3000);
      if (callback)
        callback(data, event);
    });
  }

  ngOnDestroy() {
    Object.keys(this.channels).forEach(k => {
      this.channels[k].unbind_global();
      this.channels[k].unsubscribe();
    });
  }
}
