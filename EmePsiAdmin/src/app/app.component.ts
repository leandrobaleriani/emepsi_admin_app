import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {firebase} from '@firebase/app';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../app/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Solicitudes Pendientes',
      url: '/pendientes',
      icon: 'time'
    },
    {
      title: 'Historial',
      url: '/historial',
      icon: 'archive'
    },
    {
      title: 'Profesionales',
      url: '/profesionales',
      icon: 'people'
    },
    {
      title: 'Calendario',
      url: '/calendario',
      icon: 'calendar'
    }
  ];

  constructor(
    private notificationsService: NotificationsService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    firebase.initializeApp(environment.firebase);
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    await this.notificationsService.init();
  }

  ngAfterViewInit() {
    this.platform.ready().then(async () => {
       await this.notificationsService.requestPermission();
    });
}
}
