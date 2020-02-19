import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { InvoiceComponent } from './invoice/invoice.component';


const routes: Routes = [
  { path: 'companies', component: CompaniesComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'order', component: OrdersComponent},
  { path: 'invoice', component: InvoiceComponent},
  { path: '', redirectTo: 'companies', pathMatch: 'full' },
  { path: '**', redirectTo: 'companies', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
