import { Component, inject } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form-client',
  imports: [],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.scss'
})
export class FormClientComponent {

  private service = inject(ClientService);


  protected closeForm():void{
    this.service.hideForm();
  }


}
