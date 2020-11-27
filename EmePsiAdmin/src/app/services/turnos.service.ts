import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../model/Turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  baseUrl = "https://medil.com.ar/serviciosSaludLaboral";

	constructor(private http: HttpClient) { }

	getTurnos(): Observable<Turno[]> {
		return this.http.get<Turno[]>(this.baseUrl + "/obtenerTurnos.php");
	}

	getById(id: number): Observable<Turno> {
		return this.http.get<Turno>(this.baseUrl + "/obtenerTurnoById.php?id= " + id);
	}

	getTurnosPendientes(): Observable<Turno[]> {
		return this.http.get<Turno[]>(this.baseUrl + "/obtenerTurnosPendientes.php");
	}

	saveTurno(turno: Turno): Observable<Turno> {
		return this.http.post<Turno>(this.baseUrl + "/altaTurno.php", turno);
	}

	eliminarTurno(id: number) {
		this.http.delete(this.baseUrl + "/" + id);
	}

	actualizarTurno(id: number, estado: string): Observable<Number> {
		return this.http.get<Number>(this.baseUrl + "/cambiarEstadoTurno.php?id=" + id + "&estado=" + estado);
	}
}
