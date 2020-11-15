import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from '../model/Profesional';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  baseUrl = "http://medil.com.ar/serviciosSaludLaboral";

	constructor(private http: HttpClient) { }

	getProfesionales(): Observable<Profesional[]> {
		return this.http.get<Profesional[]>(this.baseUrl + "/obtenerProfesionales.php");
	}

	saveProfesional(profesional: Profesional): Observable<Profesional> {
		return this.http.post<Profesional>(this.baseUrl + "/altaProfesional.php", profesional);
	}

	actualizarProfesional(id: number, profesional: Profesional): Observable<Profesional> {
		return this.http.post<Profesional>(this.baseUrl + "/actualizarProfesional.php?id=" + id, profesional);
	}
}
