import { Component, HostListener, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  isLoading = false;
  isLoadingTwo = false;
  productList: ProductInterface[] = [];
  productListRandom: ProductInterface[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.productsService.getProductList(this.limit, this.offset)
        .pipe(
          tap((productList) => {
            for (let i = 0; i < 5; i++) {
              const random = Math.floor(Math.random() * ((this.limit + this.offset) - 1) + 1);
              this.productListRandom.push(productList[random]);
            }
          })
        )
        .subscribe((productList) => {
          this.productList = productList;
        });
    }, 3000);
    this.isLoading = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const current = event.target.documentElement.scrollHeight;
    const end = current / 2 + window.scrollY - 200;
    console.log(current, end)
    if (current < end && !this.isLoadingTwo && !this.isLoading) {
      this.isLoadingTwo = true;
      this.offset += this.limit;
      this.productsService.getProductList(this.limit, this.offset)
        .subscribe((productList) => {
          this.productList = this.productList.concat(productList);
          setTimeout(() => this.isLoadingTwo = false, 2000);
        });
    }
  }
}
