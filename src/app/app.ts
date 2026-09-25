import { Component } from '@angular/core';
import { CustomerDashboard } from './customer-dashboard/customer-dashboard';

@Component({
  selector: 'app-root',
  imports: [CustomerDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
