import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

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
  public editCache = {};
  dataSet = [];
  isVisible = false;
  public productsData = JSON.parse(window.localStorage.getItem('products'));
  cart: any = [];
  constructor(private notification: NzNotificationService) {

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
    this.notification.create('success', 'Product Added',
      'Product added successfully');
    this.pd_code = null;
    this.pd_name = null;
    this.pd_price = null;
    this.pd_gst = null;
  }

  startEdit(key: string): void {
    this.editCache[ key ].edit = true;
  }

  cancelEdit(key: string): void {
    this.editCache[ key ].edit = false;
  }

  saveEdit(key: string): void {
    const index = this.dataSet.findIndex(item => item.key === key);
    this.dataSet[ index ] = this.editCache[ key ].data;
    this.editCache[ key ].edit = false;
  }

  addtocart(product) {
    if (!this.cart.find(p =>{ return p.code === product.code;})) {
      product.quantity = 1;
      this.cart.push(product);
      this.notification.create('success', 'Sucesss',
        'Product added to cart.');
    } else {
      this.notification.create('error', 'Already Exists',
        'Product already added in cart.');
    }

  }

  opencart () {
    this.isVisible = true;
    this.cart.forEach(element => {
      element.total =( (element.price * 1 ) + (((element.gst)*100)/(element.price))) * (element.quantity );
    });
  }

  updatecart() {
    this.cart.forEach(element => {
      element.total =( (element.price * 1 ) + (((element.gst)*100)/(element.price))) * (element.quantity );
    });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  removefromcart(index) {
    this.cart.splice(index, 1);
  }

  gettotal() {
    let total =0;
    this.cart.forEach(element => {
      total += element.total;
    });
    return total;
  }
}
