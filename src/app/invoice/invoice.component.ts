import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  displayedInvoiceColumns: string[] = ['id', 'generated', 'action'];
  displayedOrderColumns: string[] = ['company', 'product', 'rate', 'quantity', ];
  invoiceDataSource = new MatTableDataSource([]);
  orderDataSource = new MatTableDataSource([]);
  dataLoadingStatus = true;
  showDetails = false;
  
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadAllData();
  }

  // Load list of companies registered
  loadAllData():void{
    this.dataService.getInvoices().then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.invoiceDataSource = new MatTableDataSource(res.body)
        this.dataLoadingStatus = false;
      }
    })
  }

  viewOrder(invoidID):void {
    this.dataLoadingStatus = true;
    this.dataService.getInvoiceDetails(invoidID).then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.orderDataSource = new MatTableDataSource(res.body)
        this.dataLoadingStatus = false;
        this.showDetails = true;
      }
    })
  }

  // returns the sum of all total cost
  getTotalCost():Number {
    return this.orderDataSource.data.map((order) => {
      return order.total
    }).reduce((t, v)=> {
      return t+v;
    })
  }

}
