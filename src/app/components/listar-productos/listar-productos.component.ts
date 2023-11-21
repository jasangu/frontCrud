import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import {HttpClientModule} from "@angular/common/http";
import { Producto } from '../../models/producto';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit{
  listProductos: Producto[] = [];
  constructor(private _productoService: ProductoService) {}

  ngOnInit(): void {
      this.ObtenerProductos();
  }
ObtenerProductos() {
    this._productoService.gerProductos().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    })

  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      console.log("Producto eliminado");
      this.ObtenerProductos();
    })
  }
}
