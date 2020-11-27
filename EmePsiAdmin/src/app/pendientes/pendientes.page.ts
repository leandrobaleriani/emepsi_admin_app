import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Turno } from '../model/Turno';
import { AdministracionService } from '../services/administracion.service';
import { TurnosService } from '../services/turnos.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  turnos: Turno[];

	constructor(private tService: TurnosService,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private aService: AdministracionService,
		private socialSharing: SocialSharing) {

	}

	ionViewWillEnter() {
		this.getTurnos();
	}
	
	ngOnInit() {
	}

	async getTurnos() {
		let loading = await this.loadingController.create({
			message: "Cargando...",
			spinner: "crescent"
		});

		await loading.present();
		await this.tService.getTurnosPendientes().subscribe(data => {
      this.turnos = data;
      loading.dismiss();
    }, error => {
      loading.dismiss();
    })
	}

	async verDetalle(t) {
		let detalle = "<b>Detalle: </b>" + t.tur_detalle + "<br>";
	
		const alert = await this.alertController.create({
			header: 'Detalle',
			subHeader: 'Turno N°: ' + t.tur_id,
			message: detalle,
			buttons: [
				{
					text: 'Aprobar Turno',
          cssClass: 'primary',
          handler: () => {
						this.actualizarTurno(t.tur_id, "CONFIRMADO").then(
              () => alert.dismiss());
					}
				}, {
					text: 'Cancelar Turno',
					cssClass: 'secondary',
					handler: () => {
						this.actualizarTurno(t.tur_id, "CANCELADO").then(
              () => alert.dismiss());
					}
				}
			]
		});

		await alert.present();
	}

	async actualizarTurno(id, estado) {
		let loading = await this.loadingController.create({
			message: "Espere...",
			spinner: "crescent"
		});

		await loading.present();
		await this.tService.actualizarTurno(id, estado).subscribe(data => {
			this.getTurnos();
			if (estado == "CONFIRMADO") {
				this.sendAdvice(id);
			}
			loading.dismiss();
		}, error => {
			loading.dismiss();
		})
	}

	async sendAdvice(id){
		this.tService.getById(id).subscribe(data => {
			this.aService.getProfesionalDelDia().subscribe(pro => {
				if (data.tur_tipo == "URGENCIA") {
					this.socialSharing.shareViaWhatsAppToPhone("+549" + pro.pro_telefono,
						"La persona " + data.tur_nombre 
						+ "con telefono " + data.tur_telefono
						+ " solicita atención urgente!", "");
				} else {
					this.socialSharing.shareViaWhatsAppToPhone(pro.pro_telefono,
						"La persona " + data.tur_nombre 
						+ "con telefono " + data.tur_telefono
						+ " solicita coordinar un turno", "");
				}
			});
		});
	}
}
