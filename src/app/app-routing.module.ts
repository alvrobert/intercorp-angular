import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { ListClientComponent } from './components/client/list-client/list-client.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-client', pathMatch: 'full' },
  { path: 'list-client', component: ListClientComponent },
  { path: 'create-client', component: CreateClientComponent},
  { path: 'edit-client/:id', component: CreateClientComponent},
  { path: '**', redirectTo: 'list-client', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
