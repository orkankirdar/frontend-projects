import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  test?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 1299,
      image: 'assets/headphones.png',
      test: 'TEST123'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 899,
      image: 'assets/smartwatch.png'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 499,
      image: 'assets/speaker.png'
    },
    {
      id: 4,
      name: 'VR Glasses',
      price: 1599,
      image: 'assets/vr-glasses.png'
    },
    {
      id: 5,
      name: 'Mobile Phone',
      price: 1999,
      image: 'assets/phone.png'
    },
    {
      id: 6,
      name: 'Laptop',
      price: 4999,
      image: 'assets/laptop.png'
    }
  ];
} 