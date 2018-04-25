import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'shared/services/customer.service';
import { CustomerLedgerService } from 'shared/services/customer-ledger.service';
import { Customer } from 'shared/models/customer.model';
import { Company } from 'shared/models/company.model';
import { CompanyService } from 'shared/services/company.service';
import { Invoice } from 'shared/models/invoice.model';
import { CustomerLedger } from 'shared/models/customer-ledger.model';
import { InvoiceService } from 'shared/services/invoice.service';
import { Router } from '@angular/router';
import { CashBookService } from 'shared/services/cash-book.service';
import { Cashbook } from 'shared/models/cashbook.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  companyId;
  customers: Customer[] = [];
  customer: Customer;
  company: Company;
  invoice: Invoice;
  lastLedger: CustomerLedger;
  lastCashBook: Cashbook;
  startAt = '';
  endAt = '';
  showSpiner = false;

  constructor(
    private customerService: CustomerService,
    private customerLedgerService: CustomerLedgerService,
    private companyService: CompanyService,
    private invoiceService: InvoiceService,
    private cashbookService: CashBookService,
    private router: Router,
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    //initialize invoice variables
    this.invoice = new Invoice();
    this.invoice.discount = 0;
    this.invoice.deposit = 0;
    this.invoice.date = new Date();

    // console.log(this.invoice.date);
    // let discountdate = new Date();
    // discountdate.setSeconds(this.invoice.date.getSeconds() + 10);
    // console.log(discountdate);

    if (this.companyId) {
      this.invoice.companyId = this.companyId;

      //Get company info
      await this.companyService.get(this.companyId).take(1)
        .subscribe(
          data => this.company = data,
          error => console.log('Company info loading error', error),
      )

      //Get company last cashbook
      await this.cashbookService.getCompanyLastCashbook(this.companyId).take(1)
        .subscribe(
          data => {
            data.forEach(lcash =>{
              this.lastCashBook = lcash as Cashbook;
            })
          },
          error => console.log('Last Cashbok loading error', error)
        )

    }
  }

  async findCustomers() {
    if (this.companyId) {
      await this.customerService.searchCustomer(this.startAt, this.endAt, this.companyId).take(1)
        .subscribe(data => {
          this.customers = [];
          data.forEach(resp => {
            let comp = resp.payload.doc.data() as Customer;
            comp.id = resp.payload.doc.id;
            this.customers.push(comp);
          });
        });
    }
  }

  search($event) {
    let q = $event.target.value;
    this.customers = [];
    if (q) {
      this.customerService.customers$
        .subscribe(cus => {
          let search = cus.filter(ci => ci.name.toLowerCase().indexOf(q.toLowerCase()) > -1).slice(0, 5);
          search.forEach(cus => {
            this.customers.push(cus);
          });
        });
    }
  }

  async getCustomerLastLedger(customerId) {
    await this.customerLedgerService.getCustomerLastLedger(customerId).take(1)
      .subscribe(data => {
        data.forEach(lastLedg => {
          this.lastLedger = lastLedg as CustomerLedger;
          this.invoice.previousDue = this.lastLedger.balance;
        })
      })
  }

  async loadCustomerLedger(customerId) {
    this.getCustomerLastLedger(customerId);
    this.customer = this.customers.find(cu => cu.id == customerId);
    this.invoice.customerId = customerId;
  }

  calculateBalance() {
    this.invoice.total = this.invoice.previousDue - this.invoice.discount;
    this.invoice.due = this.invoice.total - this.invoice.deposit;
  }

  async saveInvoice(invoice) {
    let newInvoice = JSON.parse(JSON.stringify(this.invoice))//remove all null values from object
    delete newInvoice['id'];
    newInvoice.date = new Date();
    this.invoiceService.create(newInvoice)
      .then(ref => {
        //Add cutomer deposite ledger
        let depositBalance = this.lastLedger.balance - newInvoice.deposit;
        let cLedger = new CustomerLedger('', newInvoice.customerId, new Date(), newInvoice.explanation, null, 0, invoice.deposit, depositBalance)
        delete cLedger['id'];
        this.customerLedgerService.create(cLedger)
          .then(ref => {
            console.log('Deposite saved')
            //If any discount then add to the customer ledger
            if (newInvoice.discount > 0) {
              let discountBalance = depositBalance - invoice.discount;
              let discountdate = new Date();
              discountdate.setSeconds(this.invoice.date.getSeconds() + 10);

              let disLedger = new CustomerLedger('', newInvoice.customerId, discountdate, 'Discount', null, 0, invoice.discount, discountBalance)
              delete disLedger['id'];
              this.customerLedgerService.create(disLedger)
                .then(ref => console.log('Discount saved'));
            }
          });

        //Add cash book
        let balance = (this.lastCashBook == undefined ? 0 : this.lastCashBook.balance) + this.invoice.deposit;
        let cashb =    new Cashbook('', new Date(), this.companyId, this.customer.name + ' : ' + newInvoice.explanation, null, invoice.deposit, 0, balance);
        delete cashb["id"];
        this.cashbookService.create(cashb)
          .then(ref => console.log('Cashbook saved'));

        this.router.navigate(['/dashboard/accounting/invoice-list']);
      })
  }

  test(invoice){
    
  }
}
