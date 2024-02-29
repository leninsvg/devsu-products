import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { FormProductComponent } from './components/form-product/form-product.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:flow',
    component: FormProductComponent
  }
];
