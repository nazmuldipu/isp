import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'shared/services/invoice.service';
import { Invoice } from 'shared/models/invoice.model';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from 'shared/services/company.service';
import { Company } from 'shared/models/company.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  companyId;
  invoices: Invoice[] = [];
  invoice: Invoice;
  customer: Customer;
  company: Company;
  lastVisible;
  firstVisible;
  subscription: Subscription;
  limit: number;

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
    this.limit = 5;
  }

  async ngOnInit() {
    if (this.companyId) {
      // load company information
      this.subscription = await this.companyService.get(this.companyId).take(1)
        .subscribe(
          data => this.company = data,
          error => console.log('Company info loading error', error),
      )
      //load invoice paginated
      this.last();
    }
  }

  async getPaginated(companyId, orderBy, order, limit, startAfter){
    this.subscription = await this.invoiceService.getPaginatedStartAfter(companyId, orderBy, order, limit, startAfter)
    .subscribe(data => {
      if (data.length > 0) {
        this.lastVisible = data[data.length - 1].payload.doc.data();
        this.firstVisible = data[0].payload.doc.data();
        
        this.invoices = [];
        data.forEach(inv => {
          let invo = inv.payload.doc.data() as Invoice;
          invo.id = inv.payload.doc.id;
          this.invoices.push(invo);
        });//end data loop

        // Reverse the first and last if order was desc
        if(order === 'desc'){
          let swap = this.lastVisible;
          this.lastVisible = this.firstVisible;
          this.firstVisible = swap;
          this.invoices.reverse();
        }
      }
    });//end subscription loop
  }

  first() {
    this.getPaginated(this.companyId,'date', 'asc',this.limit, null);
  }

  prev() {
    this.getPaginated(this.companyId, 'date', 'desc', this.limit, this.firstVisible.date);
  }

  next() {
    this.getPaginated(this.companyId, 'date', 'asc', this.limit, this.lastVisible.date);
  }

  last() {
    this.getPaginated(this.companyId, 'date', 'desc', this.limit, new Date())
  }
  
  changeLimit(value){
    this.limit = parseInt(value);
    this.last();
  }

  loadCustomer(customerId) {
    this.customer = new Customer();
    this.subscription = this.customerService.customers$
      .subscribe(data => {
        this.customer = data.find(cus => cus.id == customerId);
      })
  }

  loadInvoice(id) {
    this.invoice = this.invoices.find(inv => inv.id == id);
    this.loadCustomer(this.invoice.customerId);
  }
}
