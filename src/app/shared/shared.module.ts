import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ImageComponent } from './components/image/image.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FiltersComponent } from './components/filters/filters.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

import { DiscountPipe } from './pipes/discount.pipe';

import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductListComponent,
    ImageComponent,
    LoaderComponent,
    FiltersComponent,
    BannerComponent,
    CategoryListComponent,
    DiscountPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    FontAwesomeModule
  ],
  exports: [
    ProductItemComponent,
    ProductListComponent,
    ImageComponent,
    LoaderComponent,
    FiltersComponent,
    BannerComponent,
    CategoryListComponent,
    DiscountPipe
  ]
})
export class SharedModule { }
