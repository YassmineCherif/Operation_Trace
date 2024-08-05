import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { AppComponent } from './app.component';
import { OperationListComponent } from './components/Operation/operation-affich/operation-affich.component';
import { OperationCreateComponent } from './components/Operation/operation-create/operation-create.component';
import { OperationEditComponent } from './components/Operation/operation-edit/operation-edit.component';
import { NumSerieAffichComponent } from './components/NumSerie/numserie-affich/numserie-affich.component';
import { NumserieEditComponent } from './components/NumSerie/numserie-edit/numserie-edit.component';
import { NumSerieCreateComponent } from './components/NumSerie/numserie-create/numserie-create.component';
import { FrontNavbarComponent } from './components/front-navbar/front-navbar.component';
import { FrontFooterComponent } from "./components/front-footer/front-footer.component";
import { HomeComponent } from './components/home/home.component';
import { TraceAffichComponent } from './components/Trace/trace-affich/trace-affich.component';
import { LoginComponent } from './components/User/login/login.component';
import { TraceCreateComponent } from './components/Trace/trace-create/trace-create.component';
import { RegisterComponent } from './components/User/register/register.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './components/User/update-profile/update-profile.component';

// Define your routes here
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'operation/all', component: OperationListComponent },
  { path: 'operation/create', component: OperationCreateComponent },
  { path: 'operation/edit/:id', component: OperationEditComponent },
  { path: 'numserie/all', component: NumSerieAffichComponent },
  { path: 'numserie/edit/:id', component: NumserieEditComponent },
  { path: 'numserie/create', component: NumSerieCreateComponent },
  { path: 'trace/all', component: TraceAffichComponent },
  { path: 'trace/create', component: TraceCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'register', component: RegisterComponent },
  {path : 'forgot', component: ForgotPasswordComponent},
  {path : 'profile', component: UpdateProfileComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    OperationListComponent,
    OperationCreateComponent,
    OperationEditComponent,
    NumSerieAffichComponent,
    NumserieEditComponent,
    NumSerieCreateComponent,
    FrontNavbarComponent,
    FrontFooterComponent,
    HomeComponent,
    TraceAffichComponent,
    LoginComponent,
    TraceCreateComponent,
    RegisterComponent ,
    ForgotPasswordComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule, // Add CommonModule here
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
