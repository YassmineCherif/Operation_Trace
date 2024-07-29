import { Routes } from '@angular/router';
import { OperationListComponent } from './components/operation-affich/operation-affich.component';
import { OperationCreateComponent } from './components/operation-create/operation-create.component';
import { OperationEditComponent } from './components/operation-edit/operation-edit.component';
import { NumSerieCreateComponent } from './components/numserie-create/numserie-create.component';
import { NumSerieAffichComponent } from './components/numserie-affich/numserie-affich.component';
import { NumserieEditComponent } from './components/numserie-edit/numserie-edit.component';
import { HomeComponent } from './components/home/home.component';
import { TraceAffichComponent } from './components/Trace/trace-affich/trace-affich.component';
import { LoginComponent } from './components/User/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'operation/all', component: OperationListComponent },
  { path: 'operation/create', component: OperationCreateComponent },
  { path: 'operation/edit/:id', component: OperationEditComponent },
  { path: 'numserie/all', component: NumSerieAffichComponent },
  { path: 'numserie/edit/:id', component: NumserieEditComponent },
  { path: 'numserie/create', component: NumSerieCreateComponent },
  {path : 'trace/all' , component:TraceAffichComponent},
  {path : 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'home' }
];
