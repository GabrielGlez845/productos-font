import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format, parseJSON } from 'date-fns';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^\\w+\\s?\\w+?\\s?\\w+?$')]), 
    cantidad: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$')]),
    precio: new FormControl(null, [Validators.required,Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),    
    fecha: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(1, [Validators.required]),
  });

  id = 0;
  producto:any = [];
  cargando = true;
  constructor(private route:ActivatedRoute, private productosService:ProductosService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (data) => {
        this.id = data['id']
    })    
    if (this.id != 0) {
      this.producto = await this.productosService.obtenerUnProducto(+this.id)
      console.log(this.producto.data.fecha)
      this.obtenerProducto(this.producto.data);
      
    }
    this.cargando = false;
  }

  get nombreNovalido() {
    return this.form.get('nombre')!.invalid && this.form.get('nombre')!.touched;
  }

  get cantidadNovalido() {
    return this.form.get('cantidad')!.invalid && this.form.get('cantidad')!.touched;
  }

  get precioNovalido() {
    return this.form.get('precio')!.invalid && this.form.get('precio')!.touched;
  }

  get fechaNovalido() {
    return this.form.get('fecha')!.invalid && this.form.get('fecha')!.touched;
  }

  obtenerProducto(producto:any){
    const productDate = parseJSON(producto.fecha);
    const fecha = format(productDate, 'yyyy-MM-dd');

    this.form.controls['nombre'].setValue(producto.nombre);
    this.form.controls['cantidad'].setValue(producto.cantidad);
    this.form.controls['precio'].setValue(producto.precio);    
    this.form.controls['fecha'].setValue(fecha);
  }

  async modificarProducto(){
    if (this.form.invalid) {
      return Object.values( this.form.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }

    const resp:any = await this.productosService.modificarProducto(this.id,this.form.value)
    if (resp.ok){
      this.form.reset();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title:'modificado con exito', icon: 'success'}
       );
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'sucedio un erro inesperado', icon: 'error'}
       );
    }
  }

}
