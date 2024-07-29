import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OperationListComponent } from './components/operation-affich/operation-affich.component';
import { OperationCreateComponent } from './components/operation-create/operation-create.component';
import { OperationEditComponent } from './components/operation-edit/operation-edit.component';
import { NumSerieAffichComponent } from './components/numserie-affich/numserie-affich.component';
import { NumserieEditComponent } from './components/numserie-edit/numserie-edit.component';
import { NumSerieCreateComponent } from './components/numserie-create/numserie-create.component';
import { FrontNavbarComponent } from './components/front-navbar/front-navbar.component';
import { FrontFooterComponent } from "./components/front-footer/front-footer.component";
import { HomeComponent } from './components/home/home.component';
import { TraceAffichComponent } from './components/Trace/trace-affich/trace-affich.component';
import { LoginComponent } from './components/User/login/login.component';

// Define your routes here
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'operation/all', component: OperationListComponent },
  { path: 'operation/create', component: OperationCreateComponent },
  { path: 'operation/edit/:id', component: OperationEditComponent },
  { path: 'numserie/all', component: NumSerieAffichComponent },
  { path: 'numserie/edit/:id', component: NumserieEditComponent },
  { path: 'numserie/create', component: NumSerieCreateComponent },
  {path : 'home', component: HomeComponent},
  {path : 'trace/all' , component:TraceAffichComponent},
  { path: 'login', component: LoginComponent},
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
