import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^\\w+\\s?\\w+?\\s?\\w+?$')]), 
    cantidad: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$')]),
    precio: new FormControl(null, [Validators.required,Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),    
    fecha: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(1, [Validators.required]),
  });

  constructor(private productosService:ProductosService) { }

  ngOnInit(): void {

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

  async agregarProducto(){
    if (this.form.invalid) {
      console.log('invalido');
      return Object.values( this.form.controls).forEach(control => {
       if (control instanceof FormGroup ) {
        Object.values( control.controls).forEach(control => control.markAsTouched());
       } else {
          control.markAsTouched();
       }
     });
    }

    console.log('valido')

    const resp:any = await this.productosService.crearProducto(this.form.value)
    if (resp.ok){
      this.form.reset();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title:'agregado con exito', icon: 'success'}
       );
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'sucedio un erro inesperado', icon: 'error'}
       );
    }
  }
}
