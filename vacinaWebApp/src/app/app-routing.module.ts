import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacinaComponent } from './cadastros/vacina/vacina.component';
import { VacinaListComponent } from './cadastros/vacina/vacina-list/vacina-list/vacina-list.component';

const routes: Routes = [
  {path: 'vacina', component: VacinaComponent},
  {path: 'vacina-edit/:id', component: VacinaComponent},
  {path: 'vacina-list', component: VacinaListComponent},
  //{path: '', redirectTo: 'home'},
  //{path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

