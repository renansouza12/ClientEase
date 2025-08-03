import { Component, inject } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-form-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.scss'
})
export class FormClientComponent {

  private service = inject(ClientService);

  private phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{2,3}\)?)[-.\s]?(\d{4,5})[-.\s]?(\d{4})$/;

  protected form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    plan: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    start_date: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    end_date: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(this.phoneRegex)]
    })


  })

  protected onSubmit(): void {
    if (this.form.valid) {

      const formValue = this.form.value;

      const newClient = {
        name: formValue.name!,
        plan: formValue.plan!,
        startDate: formValue.start_date!,
        endDate: formValue.end_date!,
        phoneNumber: formValue.phone!
      };

      const clientExist = this.service.getClients()
        .some(client => client.name.toLowerCase() === newClient.name.toLowerCase());

      if (clientExist) {
        alert(`Client with name "${newClient.name}" already exists.`);
        return;
      }

      this.service.addClient(newClient);
      this.form.reset();
    }
  }

  protected closeForm(): void {
    this.service.hideForm();
  }

}
