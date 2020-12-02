import { Component,Input } from '@angular/core';
import{Product} from '../product.model';

@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
//   template: `<div class="modal fade" id="myModal" role="dialog">
//   <div class="modal-dialog">
//       <div class="modal-content">
//           <div class="modal-header">
//                   <button type="button" class="close" data-dismiss="modal">&times;</button>
//                           <h4 class="modal-title">Close</h4>
//                           </div>
//                       <div class="modal-body">                               
//                               <img [src]="product.imageUrl">                        
//                       </div>
//       </div>
//   </div>
// </div>`

})
export class ModalContentComponent {

  

  @Input()  product:Product;

  functionABC(){
    document.getElementById("someid").innerHTML="<img src='" + this.product.imageUrl + "' width='200px' height='200px'>";
  }

}
