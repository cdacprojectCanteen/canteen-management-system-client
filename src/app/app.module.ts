import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "/menu",
    pathMatch: 'full'
  },
  {path : 'menu', component : MenuComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductBoxComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    ContactusComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
