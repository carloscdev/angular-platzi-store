import { Component, HostListener, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CategoryInterface, ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from '../../../services/products.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

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
  categoryList: CategoryInterface[] = [];
  productId: string | null = null;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
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
    }, 1000);
    this.getCategoryList()
    this.isLoading = false;
    this.route.queryParamMap
      .subscribe(params => {
        this.productId = params.get('product');
      });
  }

  getCategoryList() {
    this.categoryService.getCategoryList()
      .subscribe((categories) => {
        setTimeout(() => {
          this.categoryList = categories
        }, 1000);
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const current = event.target.documentElement.scrollHeight;
    const end = current / 2 + window.scrollY - 200;
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
