import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

const dataURL = 'http://localhost:8000'
export class DataService {

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get(dataURL + '/companies', {observe: 'response'}).toPromise();
  }

  addCompany(data) {
    return this.http.post(dataURL + '/company', data).toPromise();
  }

  getGroupedProducts() {
    return this.http.get(dataURL + '/products?groupby=company', {observe: 'response'}).toPromise();
  }

  getProducts() {
    return this.http.get(dataURL + '/products', {observe: 'response'}).toPromise();
  }

  addProducts(data) {
    return this.http.post(dataURL + '/products', data).toPromise();
  }

  createOrder(data) {
    return this.http.post(dataURL + '/orders', data, {observe: 'response'}).toPromise();
  }

  getInvoices() {
    return this.http.get(dataURL + '/invoices', {observe: 'response'}).toPromise();
  }

  getInvoiceDetails(invoiceID) {
    return this.http.get(dataURL + '/invoices/' + invoiceID, {observe: 'response'}).toPromise();
  }
}
