import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.interface';


@Component({
  selector: 'app-form-client',
  imports: [ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.scss'
})
export class FormClientComponent implements OnInit {
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
  protected buttonText:string = 'Add Client';

  protected originalName :string | null = null;
  protected clientToEdit: Client | null = null;

  ngOnInit(): void {

    this.service.clientToEdit$.subscribe(client => {
      this.clientToEdit = client;
      if (client) {
        this.originalName = client.name;
        this.buttonText = "Update Client"
        this.form.patchValue({
          name: client.name,
          plan: client.plan,
          start_date: client.startDate,
          end_date: client.endDate,
          phone: client.phoneNumber
        });
        this.form.get('name')?.enable();
      } else {
        this.originalName = null;
        this.form.reset();
         this.form.get('name')?.enable();
      }
    })

  }

  protected onSubmit(): void {
    if (this.form.valid) {

      const formValue = this.form.getRawValue();

      const client = {
        name: formValue.name!,
        plan: formValue.plan!,
        startDate: formValue.start_date!,
        endDate: formValue.end_date!,
        phoneNumber: formValue.phone!
      };

      if (this.clientToEdit) {

        this.service.updateClient(client, this.originalName!);
      } else {

        const clientExist = this.service.getClients()
          .some(c => c.name.toLowerCase() === client.name.toLowerCase());

        if (clientExist) {
          alert(`Client with name "${client.name}" already exists.`);
          return;
        }
        
        this.service.addClient(client);
      }

      this.form.reset();
      this.buttonText = "Add Client";
    }
  }

  protected closeForm(): void {
    this.service.hideForm();
  }

}
