import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'gst'];
  dataSource = new MatTableDataSource([]);
  dataLoadingStatus = true;
  companyForm:FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.companyForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.maxLength(200)]),
      'gst': new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  ngOnInit() {
    this.loadData();
  }

  // Load list of companies registered
  loadData():void{
    this.dataService.getCompanies().then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.dataSource = new MatTableDataSource(res.body)
        this.dataLoadingStatus = false;
      }
    })
  }

  // Register a new company
  addNew(company):void {
    this.dataLoadingStatus = true;
    this.dataService.addCompany(company).then((res:HttpResponse<any>) => {
      if (res.status == 200) {
        this.loadData();
      } else {
        alert(res.body.message);
        this.dataLoadingStatus = false;
      }
    });
    this.companyForm.reset();
  }
}
