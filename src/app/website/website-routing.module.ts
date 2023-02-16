import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

import { MycartComponent } from './pages/mycart/mycart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true,
        }
      },
      {
        path: 'product/:id',
        canDeactivate: [ExitGuard],
        component: ProductDetailComponent,
      },
      {
        path: 'my-cart',
        component: MycartComponent,
      },
      {
        path: 'profile',
        canActivate: [ AuthGuard ],
        component: ProfileComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
