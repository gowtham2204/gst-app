import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pd_code: string;
  public pd_name: string;
  public pd_price: number;
  public pd_gst: number;
  constructor() {

  }

  addProduct() {
    const product: any = {
      code: this.pd_code,
      name: this.pd_name,
      price: this.pd_price,
      gst: this.pd_gst
    };
    console.log('###', product);
    let products: any[] = JSON.parse(window.localStorage.getItem('products'));
    console.log('@@@@@@@@@@@', products);
    if (!products) {
      products = [];
    }
    products.push(product);
    window.localStorage.setItem('products', JSON.stringify(products));
    this.pd_code = null;
    this.pd_name = null;
    this.pd_price = null;
    this.pd_gst = null;
  }
}
