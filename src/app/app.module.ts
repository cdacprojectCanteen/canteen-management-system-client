import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { MenuComponent } from './menu/menu.component';


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
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
