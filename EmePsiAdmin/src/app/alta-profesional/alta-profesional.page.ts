import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Profesional } from '../model/Profesional';
import { AdministracionService } from '../services/administracion.service';

@Component({
  selector: 'app-alta-profesional',
  templateUrl: './alta-profesional.page.html',
  styleUrls: ['./alta-profesional.page.scss'],
})
export class AltaProfesionalPage implements OnInit {

  profesional: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController,
    private aService: AdministracionService, public loadingController: LoadingController, 
    public toastController: ToastController) {
		this.profesional = this.formBuilder.group({
			nombre: '',
			direccion: '',
			telefono: ''
		});
	}

	ngOnInit() {
	}

	async saveProfesional() {
    let profesional = new Profesional();
		profesional.pro_nombre = this.profesional.controls.nombre.value;
		profesional.pro_telefono = this.profesional.controls.telefono.value;
    	profesional.pro_direccion = this.profesional.controls.direccion.value;
		
		let loading = await this.loadingController.create({
			message: "Espere...",
			spinner: "crescent"
		});

		const toast = await this.toastController.create({
			color: 'primary',
			message: 'Se registró el profesional!',
			duration: 2000
		  });

		await loading.present();
		await this.aService.saveProfesional(profesional).subscribe(data => {
			toast.present();
			loading.dismiss();
			this.navigateBack();
		}, error => {
			loading.dismiss();
		})
	}

	navigateBack() {
		this.navCtrl.back();
	}

}
