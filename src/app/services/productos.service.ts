import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url = 'http://localhost:7000/api';
  constructor(private http:HttpClient) { }

  obtenerProductos(){
    return this.http.get(`${this.url}/productos`).toPromise();
  }

  obtenerUnProducto(id:number){
    return this.http.get(`${this.url}/productos/${id}`).toPromise();
  }

  crearProducto(body:any){
    return this.http.post(`${this.url}/productos`,body).toPromise();
  }

  modificarProducto(id:number,body:any){
    return this.http.put(`${this.url}/productos/${id}`,body).toPromise();
  }

  eliminarProducto(id:number){
    return this.http.delete(`${this.url}/productos/${id}`).toPromise();
  }

}
