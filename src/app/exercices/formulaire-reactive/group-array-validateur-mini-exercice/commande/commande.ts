import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-commande',
  imports: [ReactiveFormsModule],
  templateUrl: './commande.html',
})
export class Commande {
  private fb = inject(FormBuilder).nonNullable;

  commandeForm = this.fb.group({
    client: ['', Validators.required],
    articles: this.fb.array([this.creerArticle()]),
  });

  valeur = toSignal(this.commandeForm.valueChanges, { initialValue: this.commandeForm.getRawValue() });

  total = computed(() =>
    (this.valeur().articles ?? []).reduce(
      (somme, article) => somme + (article.quantite ?? 0) * (article.prixUnitaire ?? 0),
      0,
    ),
  );

  get articles() {
    return this.commandeForm.controls.articles;
  }

  ajouterArticle() {
    this.articles.push(this.creerArticle());
  }

  supprimerArticle(index: number) {
    this.articles.removeAt(index);
  }

  private creerArticle() {
    return this.fb.group({
      produit: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
    });
  }
}
