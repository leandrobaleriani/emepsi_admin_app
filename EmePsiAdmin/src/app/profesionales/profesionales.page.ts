import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Profesional } from '../model/Profesional';
import { AdministracionService } from '../services/administracion.service';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.page.html',
  styleUrls: ['./profesionales.page.scss'],
})
export class ProfesionalesPage implements OnInit {

  profesionales: Profesional[];

	constructor(private aService: AdministracionService,
    public loadingController: LoadingController,
    private navCtrl: NavController) {

	}

	ionViewWillEnter() {
		this.getProfesionales();
	}
	
	ngOnInit() {
	}

	async getProfesionales() {
		let loading = await this.loadingController.create({
			message: "Cargando...",
			spinner: "crescent"
		});

		await loading.present();
		await this.aService.getProfesionales().subscribe(data => {
			this.profesionales = data;
			loading.dismiss();
		}, error => {
			loading.dismiss();
		});
  }
  
  alta() {
		this.navCtrl.navigateRoot("alta-profesional");
	}
}
