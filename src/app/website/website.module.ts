import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { WebsiteRoutingModule } from './website-routing.module';
import { NavComponent } from './components/nav/nav.component';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperModule } from 'swiper/angular';
import { TokenInterceptor } from '../interceptors/token.interceptor';

import { FormsModule } from '@angular/forms';

import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [
    NavComponent,
    LoginComponent,
    HomeComponent,
    MycartComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    QuicklinkModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
})
export class WebsiteModule { }
