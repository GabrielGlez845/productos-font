import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  productos:any;
  constructor(private productosService:ProductosService, private router:Router) { }

   async ngOnInit(): Promise<void> {
    const data:any = await this.productosService.obtenerProductos();
    console.log(data)
    this.productos = data.data
  }

  modificar(id:number){
      this.router.navigate(['/modificar',id])
  }



}
