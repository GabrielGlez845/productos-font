import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$')]),
  });

  constructor(private productosService:ProductosService) { }

  ngOnInit(): void {
  }

  get idNovalido() {
    return this.form.get('id')!.invalid && this.form.get('id')!.touched;
  }

  async eliminarProdcuto(){
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
    const resp:any = await this.productosService.eliminarProducto(this.form.value['id']);
    if (resp.ok){
      this.form.reset();
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title:'eliminado con exito', icon: 'success'}
       );
    }else{
      Swal.fire(
        { toast: true, position: 'top-end', showConfirmButton: false, timer: 5000, title: 'sucedio un erro inesperado', icon: 'error'}
       );
    }
  }

}
