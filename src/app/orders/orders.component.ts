import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'gst'];
  dataSource = new MatTableDataSource([]);
  dataLoadingStatus = true;
  orderForm:FormGroup;
  orderArray: any[] = [];
  products:any[];
  companies;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      'company': new FormControl('', [Validators.required, Validators.maxLength(200)]),
      'product': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern('[0-9]*'), Validators.min(1)])
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  // Load list of companies registered
  loadProducts():void{
    this.dataLoadingStatus = true;
    this.dataService.getGroupedProducts().then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.dataLoadingStatus = false;
        this.products = res.body;
      }
    })
  }

  // creates the order table
  addToOrder(orderData) {
    this.orderArray.push({
      'company_id': orderData.company.id,
      'company_name': orderData.company.name,
      'product_id': orderData.product.id,
      'product_name': orderData.product.name,
      'product_rate': orderData.product.cost,
      'quantity': orderData.quantity,
      'total': (orderData.product.cost * orderData.quantity),
    })

    this.dataSource = new MatTableDataSource(this.orderArray);
    this.orderForm.reset();
  }

  // returns the sum of all total cost
  getTotalCost():Number {
    return this.dataSource.data.map((order) => {
      return order.total
    }).reduce((t, v)=> {
      return t+v;
    })
  }

  // send required data, clean screen
  createOrder(){
    this.dataLoadingStatus = true;
    let finalOrder = this.dataSource.data.map((elem)=> {
      return {product_id: elem.product_id, quantity: elem.quantity}
    })

    this.dataService.createOrder(finalOrder).then((res)=> {
      if(res.status == 200) {
        alert('Order has been successfully placed');
        this.dataSource = new MatTableDataSource([]);
        this.dataLoadingStatus = false;
      }
    })
  }

}
