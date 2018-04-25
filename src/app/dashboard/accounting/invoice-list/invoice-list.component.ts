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

  constructor(
    private invoiceService: InvoiceService,
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
    console.log(this.companyId);
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
      this.getInvoiceReverse(this.companyId, 'date', 10, new Date());
    }
  }

  async getInvoiceForward(companyId, orderBy, limit, startAfter) {
    this.subscription = await this.invoiceService.getPaginatedForward(companyId, orderBy, limit, startAfter)
      .subscribe(data => {
        if (data.length > 0) {
          this.lastVisible = data[data.length - 1].payload.doc.data();
          this.firstVisible = data[0].payload.doc.data();

          this.invoices = [];
          data.forEach(inv => {
            let invoice = inv.payload.doc.data() as Invoice;
            invoice.id = inv.payload.doc.id;
            this.invoices.push(invoice);
          });//end data loop
        }
      });//end subscription loop
  }


  async getInvoiceReverse(companyId, orderBy, limit, endBefore) {
    this.subscription = await this.invoiceService.getPaginatedReverse(companyId, orderBy, limit, endBefore)
      .subscribe(data => {
        if (data.length > 0) {
          this.lastVisible = data[data.length - 1].payload.doc.data();
          this.firstVisible = data[0].payload.doc.data();

          this.invoices = [];
          data.forEach(inv => {
            let invoice = inv.payload.doc.data() as Invoice;
            invoice.id = inv.payload.doc.id;
            this.invoices.push(invoice);
          });//end data loop
        }
      });//end subscription loop
  }

  first() {
    // TODO: Complete this function
  }

  next() {
    // TODO: Complete this function
  }

  loadCustomer(customerId) {
    this.customer = new Customer();
    this.subscription = this.customerService.customers$
      .subscribe(data => {
        this.customer = data.find(cus => cus.id == customerId);
        console.log(this.customer);
      })
  }

  loadInvoice(id) {
    this.invoice = this.invoices.find(inv => inv.id == id);
    this.loadCustomer(this.invoice.customerId);
  }


  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Invoice</title>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
