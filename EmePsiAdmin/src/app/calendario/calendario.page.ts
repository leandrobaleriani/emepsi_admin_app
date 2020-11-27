import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Calendario } from '../model/Calendario';
import { AdministracionService } from '../services/administracion.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss']
})
export class CalendarioPage implements OnInit {

  horarios: Calendario[] = [];

	constructor(private aService: AdministracionService,
		public loadingController: LoadingController,
    public alertController: AlertController,
    private navCtrl: NavController) {

	}

	ionViewWillEnter() {
		this.getCalendario();
	}
	
	ngOnInit() {
	}

	async getCalendario() {
		let loading = await this.loadingController.create({
			message: "Cargando...",
			spinner: "crescent"
		});

		await loading.present();
		await this.aService.getCalendario().subscribe(data => {
			this.horarios = data;
			loading.dismiss();
    }, error => {
      loading.dismiss();
    })
  }
  
  alta() {
		this.navCtrl.navigateRoot("alta-calendario");
	}

	modificar(fecha, nombre, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				fecha: fecha,
				nombre: nombre,
				id: id
			}
		}

		this.navCtrl.navigateRoot("alta-calendario", navigationExtras);
	}

}
