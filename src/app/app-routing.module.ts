import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Correctly imported the component
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';

const routes: Routes = [
  // --- ROUTE DEFINITION ADDED HERE ---
  { path: '', component: DynamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
