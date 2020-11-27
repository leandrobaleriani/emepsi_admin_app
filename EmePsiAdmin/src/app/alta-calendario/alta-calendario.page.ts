import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Calendario } from '../model/Calendario';
import { Profesional } from '../model/Profesional';
import { AdministracionService } from '../services/administracion.service';

@Component({
  selector: 'app-alta-calendario',
  templateUrl: './alta-calendario.page.html',
  styleUrls: ['./alta-calendario.page.scss'],
})
export class AltaCalendarioPage implements OnInit {

  calendario: FormGroup;
  id: number;
  profesionales: Profesional[] = [];
  nombre: string = "";

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController,
    private aService: AdministracionService, public loadingController: LoadingController, 
	public toastController: ToastController,
	private route: ActivatedRoute) {
		this.calendario = this.formBuilder.group({
			nombre: '',
			fecha: ''
		});
	}

	ngOnInit() {
		this.aService.getProfesionales().subscribe(data => {
			this.profesionales = data;
		
			this.route.queryParams.subscribe(params => {
				this.calendario.controls.fecha.setValue(params["fecha"]);
				this.calendario.controls.nombre.setValue(params["nombre"]);
				this.id = params["id"];
			});
		});
	}

	async saveCalendario() {

		let loading = await this.loadingController.create({
			message: "Espere...",
			spinner: "crescent"
		});

		const toast = await this.toastController.create({
			color: 'primary',
			message: 'Se registró el profesional!',
			duration: 2000
		  });

		if (this.id) {
			let calendario = new Calendario();
			calendario.pro_nombre = this.calendario.controls.nombre.value;
			calendario.cal_dia = this.calendario.controls.fecha.value;
			calendario.cal_id = this.id;

			await loading.present();
			await this.aService.actualizarCalendario(calendario).subscribe(data => {
				toast.present();
				loading.dismiss();
				this.navigateBack();
			}, error => {
				loading.dismiss();
			});

		} else {
			let calendario = new Calendario();
			calendario.pro_nombre = this.calendario.controls.nombre.value;
			calendario.cal_dia = this.calendario.controls.fecha.value;
			
			await loading.present();
			await this.aService.saveCalendario(calendario).subscribe(data => {
				toast.present();
				loading.dismiss();
				this.navigateBack();
			}, error => {
				loading.dismiss();
			});
			
		}
	}

	navigateBack() {
		this.navCtrl.back();
	}
}
