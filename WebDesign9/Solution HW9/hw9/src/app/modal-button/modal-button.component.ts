import { Component, Input,Output,EventEmitter, } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'modal-button',
  templateUrl: './modal-button.component.html',
  
  styleUrls: ['./modal-button.component.css']
})
export class ModalButtonComponent {
@Input() product:Product;
@Output() onProductSelected:EventEmitter<Product>;


private currentProduct: Product;

constructor(){
  this.onProductSelected=new EventEmitter();
}

clicked(product:Product):void{
  this.currentProduct=product;
  this. onProductSelected.emit(product);
}


}