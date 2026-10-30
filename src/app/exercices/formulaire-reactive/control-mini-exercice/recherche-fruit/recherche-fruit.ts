import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recherche-fruit',
  imports: [ReactiveFormsModule],
  templateUrl: './recherche-fruit.html',
})
export class RechercheFruit {
  recherche = new FormControl('', [Validators.required, Validators.minLength(3)]);

  fruits = ['pomme', 'poire', 'banane', 'fraise', 'framboise', 'kiwi'];

  valeur = toSignal(this.recherche.valueChanges, { initialValue: '' });

  fruitsFiltres = computed(() =>
    this.fruits.filter((fruit) => fruit.includes((this.valeur() ?? '').toLowerCase())),
  );
}
