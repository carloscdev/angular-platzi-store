import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ImageComponent } from './components/image/image.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiscountPipe } from './pipes/discount.pipe';
import { BannerComponent } from './components/banner/banner.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FiltersComponent } from './components/filters/filters.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductItemComponent,
    ProductListComponent,
    ImageComponent,
    DiscountPipe,
    BannerComponent,
    LoaderComponent,
    FiltersComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent,
    MycartComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
