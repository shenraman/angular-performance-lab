import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  name: string;
  country: string;
  revenue: number;
}

@Component({
  selector: 'app-customer-dashboard',
imports: [FormsModule, CurrencyPipe],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css',
})
export class CustomerDashboard {
  searchText = '';
  filterCalculationCount = 0;
revenueCalculationCount = 0;

  customers: Customer[] = Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Customer ${index + 1}`,
  country: index % 2 === 0 ? 'Australia' : 'New Zealand',
  revenue: 5000 + ((index * 137) % 25000),
}));

  get filteredCustomers(): Customer[] {
  this.filterCalculationCount++;

  const search = this.searchText.trim().toLowerCase();

  if (!search) {
    return this.customers;
  }

  return this.customers.filter(
    customer =>
      customer.name.toLowerCase().includes(search) ||
      customer.country.toLowerCase().includes(search),
  );
}

 get totalRevenue(): number {
  this.revenueCalculationCount++;

  return this.filteredCustomers.reduce(
    (total, customer) => total + customer.revenue,
    0,
  );
}
}
