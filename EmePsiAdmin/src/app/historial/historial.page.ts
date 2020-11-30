import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Turno } from '../model/Turno';
import { TurnosService } from '../services/turnos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  turnos: Turno[];

	constructor(private tService: TurnosService,
		public loadingController: LoadingController,
		public alertController: AlertController) {

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
		await this.tService.getTurnos().subscribe(data => {
      this.turnos = data;
      loading.dismiss();
    }, error => {
      loading.dismiss();
    })
	}

	async verDetalle(t: Turno) {
		if (t.tur_tipo == "URGENCIA") {
			this.verDetalleUrgencia(t);
		} else {
			this.verDetalleProgramada(t);
		}
	}
	
	async verDetalleUrgencia(t) {
		let detalle = "<b>Detalle: </b>" + t.tur_detalle + "<br>";
			detalle += "<b>Telefono: </b>" + t.tur_telefono + "<br>";
			
		const alert = await this.alertController.create({
			header: 'Detalle',
			subHeader: 'Turno N°: ' + t.tur_id,
			message: detalle,
			buttons: [
				{
					text: 'Aprobar Turno',
          cssClass: 'primary',
          handler: () => {
						this.actualizarTurno(t.tur_id, "CONFIRMADO", "").then(
              () => alert.dismiss());
					}
				}, {
					text: 'Cancelar Turno',
					cssClass: 'secondary',
					handler: () => {
						this.actualizarTurno(t.tur_id, "CANCELADO", "").then(
              () => alert.dismiss());
					}
				}
			]
		});

		await alert.present();
	}

	async verDetalleProgramada(t) {
		let detalle = "<b>Detalle: </b>" + t.tur_detalle + "<br>";
			detalle += "<b>Telefono: </b>" + t.tur_telefono + "<br>";
			
		const alert = await this.alertController.create({
			header: 'Detalle',
			subHeader: 'Turno N°: ' + t.tur_id,
			message: detalle,
			inputs: [
				{
					name: 'txtHora',
					type: 'text',
					placeholder: 'Hora programada'
				}
			],
			buttons: [
				{
					text: 'Aprobar Turno',
          cssClass: 'primary',
          handler: (data) => {
						this.actualizarTurno(t.tur_id, "CONFIRMADO", data.txtHora).then(
							() => alert.dismiss());
					}
				}, {
					text: 'Cancelar Turno',
					cssClass: 'secondary',
					handler: () => {
						this.actualizarTurno(t.tur_id, "CANCELADO", "").then(
							() => alert.dismiss());
					}
				}
			]
		});

		await alert.present();
	}

	async actualizarTurno(id, estado, hora) {
		let loading = await this.loadingController.create({
			message: "Espere...",
			spinner: "crescent"
		});

		await loading.present();

		await this.tService.actualizarTurno(id, estado, hora).subscribe(data => {
			this.getTurnos();
			loading.dismiss();
		}, error => {
			loading.dismiss();
		})
	}
}
