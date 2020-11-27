import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendario } from '../model/Calendario';
import { Profesional } from '../model/Profesional';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  baseUrl = "https://medil.com.ar/serviciosSaludLaboral";

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

	getCalendario(): Observable<Calendario[]> {
		return this.http.get<Calendario[]>(this.baseUrl + "/obtenerCalendario.php");
	}

	saveCalendario(calendario: Calendario): Observable<Calendario> {
		return this.http.post<Calendario>(this.baseUrl + "/altaCalendario.php", calendario);
	}

	actualizarCalendario(calendario: Calendario): Observable<Calendario> {
		return this.http.post<Calendario>(this.baseUrl + "/actualizarCalendario.php", calendario);
	}

	getProfesionalDelDia(): Observable<Profesional> {
		return this.http.get<Profesional>(this.baseUrl + "/obtenerProfesionalDelDia.php");
	}
}
