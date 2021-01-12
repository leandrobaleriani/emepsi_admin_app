import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {environment} from '../../environments/environment';
import { Profesional } from '../model/Profesional';
import { AdministracionService } from './administracion.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private adminService: AdministracionService) { }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        navigator.serviceWorker.ready.then((registration) => {
            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const messaging = firebase.messaging();

            // Register the Service Worker
            messaging.useServiceWorker(registration);

            // Initialize your VAPI key
            messaging.usePublicVapidKey(
                  environment.firebase.vapidKey
            );

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            messaging.onMessage((payload) => {
                console.log(payload);
            });
            // Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log(refreshedToken);
                    let token = new Profesional();
                    token.pro_token = refreshedToken;
                    this.adminService.saveProfesional(token);
                }).catch((err) => {
                    console.error(err);
                });
            });

            resolve();
        }, (err) => {
            reject(err);
        });
    });
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await Notification.requestPermission();

            const token: string = await messaging.getToken();

            console.log('User notifications token:', token);

            let notToken = new Profesional();
            notToken.pro_nombre = "SISTEMA";
            notToken.pro_direccion = "";
            notToken.pro_telefono = "";
            notToken.pro_token = token;
            this.adminService.saveProfesional(notToken)
                .subscribe(data => console.log("token registrado!"));
            
        } catch (err) {
          console.log(err);
        }

        resolve();
    });
  }
}
