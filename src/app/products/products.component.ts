import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['company', 'name', 'cost'];
  dataSource = new MatTableDataSource([]);
  dataLoadingStatus = true;
  productForm:FormGroup;
  companies:any[] = [];

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      'company': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required, Validators.maxLength(200)]),
      'cost': new FormControl('', [Validators.required, Validators.pattern(/^([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/), Validators.min(0.1)])
    });
  }

  ngOnInit() {
    this.loadData();
    this.dataService.getCompanies().then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.companies = res.body;
      }
    })
  }

  // Load list of products registered
  loadData():void{
    this.dataService.getProducts().then((res:HttpResponse<any>) =>{
      if(res.status == 200) {
        this.dataSource = new MatTableDataSource(res.body);
      }
    })
  }

  // Register a new product
  addNew(product):void {
    this.dataLoadingStatus = true;
    this.dataService.addProducts(product).then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.loadData();
        this.dataLoadingStatus = false;
      } else {
        alert(res.body.message);
      }
    });
    this.productForm.reset();
  }
}
