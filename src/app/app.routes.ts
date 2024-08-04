import { Routes } from '@angular/router';
import { OperationListComponent } from './components/operation-affich/operation-affich.component';
import { OperationCreateComponent } from './components/operation-create/operation-create.component';
import { OperationEditComponent } from './components/operation-edit/operation-edit.component';
import { NumSerieCreateComponent } from './components/NumSerie/numserie-create/numserie-create.component';
import { NumSerieAffichComponent } from './components/NumSerie/numserie-affich/numserie-affich.component';
import { NumserieEditComponent } from './components/NumSerie/numserie-edit/numserie-edit.component';
import { HomeComponent } from './components/home/home.component';
import { TraceAffichComponent } from './components/Trace/trace-affich/trace-affich.component';
import { LoginComponent } from './components/User/login/login.component';
import { TraceCreateComponent } from './components/Trace/trace-create/trace-create.component';
import { RegisterComponent } from './components/User/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'operation/all', component: OperationListComponent },
  { path: 'operation/create', component: OperationCreateComponent },
  { path: 'operation/edit/:id', component: OperationEditComponent },
  { path: 'numserie/all', component: NumSerieAffichComponent },
  { path: 'numserie/edit/:id', component: NumserieEditComponent },
  { path: 'numserie/create', component: NumSerieCreateComponent },
  {path : 'trace/all' , component:TraceAffichComponent},
  {path : 'trace/create', component: TraceCreateComponent},
  { path: 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'home' }
];
