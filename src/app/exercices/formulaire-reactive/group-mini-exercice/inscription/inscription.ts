import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.html',
})
export class Inscription {
  private fb = inject(FormBuilder).nonNullable;

  inscriptionForm = this.fb.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.required, Validators.min(18)]],
    adresse: this.fb.group({
      rue: [''],
      ville: ['', Validators.required],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    }),
  });

  get adresse() {
    return this.inscriptionForm.controls.adresse.controls;
  }

  preRemplir() {
    this.inscriptionForm.patchValue({ prenom: 'Sara', adresse: { ville: 'Bruxelles' } });
  }
}
