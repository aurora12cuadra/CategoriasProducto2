import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent {
  titulo: string = 'Operaciones';
  resultado: number = 0;
  grados: number = 10;
  convertirAF():void{
    this.resultado=(this.grados*(9/5))+32;
  };

}
