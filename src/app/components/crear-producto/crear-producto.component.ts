import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Producto } from '../../models/producto';
import {HttpClientModule} from "@angular/common/http";
import { ProductoService } from '../../services/producto.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit{

productoForm: FormGroup
id: string
constructor(private fb: FormBuilder, 
            private router:  Router, 
            private _productoService: ProductoService,
            private aRouter: ActivatedRoute){      
  this.productoForm = this.fb.group({
    producto: ['', Validators.required],
    categoria: ['', Validators.required],
    cantidad: ['', Validators.required],
    precio: ['', Validators.required],
  })
  this.id = this.aRouter.snapshot.paramMap.get('id')!;
}

ngOnInit(): void {
    this.esEditar();
}

agregarProducto(){
  const PRODUCTO: Producto = {
    nombre: this.productoForm.get('producto')?.value,
    categoria: this.productoForm.get('categoria')?.value,
    cantidad: this.productoForm.get('cantidad')?.value,
    precio: this.productoForm.get('precio')?.value,
  }

if(this.id !== null) {
  this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
    console.log("Producto actualizado");
    this.router.navigate(['/']);
  })
} else {
  this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
    console.log("Producto guardado");
    this.router.navigate(['/']);
  })
}

  
  
}

esEditar(){
  if(this.id !== null){
    this._productoService.obtenerProducto(this.id).subscribe(data => {
      this.productoForm.setValue({
        producto: data.nombre,
        categoria: data.categoria,
        cantidad: data.cantidad,
       precio: data.precio,
      })
    })
  }
}
}
