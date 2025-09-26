import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/clients/client.service';
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
        start_date: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        end_date: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required]
        }),
        phone: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.pattern(this.phoneRegex)]
        })
    });

    protected buttonText: string = 'Add Client';
    protected originalName: string | null = null;
    protected clientToEdit: Client | null = null;
    protected loading: boolean = false;
    protected error: string | null = null;

    ngOnInit(): void {
        this.service.clientToEdit$.subscribe(client => {
            this.clientToEdit = client;
            if (client) {
                this.originalName = client.name;
                this.buttonText = "Update Client";
                this.form.patchValue({
                    name: client.name,
                    plan: client.plan,
                    start_date: client.startDate.toISOString().split('T')[0],
                    end_date: client.endDate.toISOString().split('T')[0], 
                    phone: client.phoneNumber
                });
                this.form.get('name')?.enable();
            } else {
                this.originalName = null;
                this.form.reset();
                this.buttonText = "Add Client";
                this.form.get('name')?.enable();
            }
        });
    }

    protected async onSubmit(): Promise<void> {
        if (this.form.valid) {
            const formValue = this.form.getRawValue();
            const client: Client = {
                name: formValue.name!,
                plan: formValue.plan!,
                startDate: new Date(formValue.start_date!),
                endDate: new Date(formValue.end_date!),
                phoneNumber: formValue.phone!
            };

            try {
                this.loading = true;
                this.error = null;

                if (this.clientToEdit) {
                    const updatedClient: Client = {
                        ...client,
                        id: this.clientToEdit.id
                    };
                    await this.service.updateClient(updatedClient, this.originalName!);
                } else {
                    await this.service.addClient(client);
                }

                this.form.reset();
                this.buttonText = "Add Client";
                this.service.hideForm();

            } catch (error: any) {
                console.error('Error saving client:', error);
                this.error = error.message || 'Failed to save client';
            } finally {
                this.loading = false;
            }
        }
    }

    protected closeForm(): void {
        this.service.hideForm();
    }
}
