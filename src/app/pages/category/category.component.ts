import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CategoryInterface, ProductInterface } from 'src/app/interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  productList: ProductInterface[] = [];
  categoryList: CategoryInterface[] = [];
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params) => {
          this.productList = [];
          this.categoryId = params.get('id');
          return this.productsService.getProductByCategory(String(this.categoryId), this.limit, this.offset)
        })
      )
      .subscribe((products) => {
        setTimeout(() => {
          this.productList = products
          this.getCategoryList()
        }, 2000);
      });
    this.route.queryParamMap
      .subscribe(params => {
        this.productId = params.get('product');
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const current = event.target.documentElement.scrollHeight;
    const end = current / 2 + window.scrollY - 100;
    if (current < end) {
      this.offset += this.limit;
      this.productsService.getProductByCategory(String(this.categoryId), this.limit, this.offset)
        .subscribe((productList) => {
          this.productList = this.productList.concat(productList);
        });
    }
  }

  getCategoryList() {
    this.categoryService.getCategoryList()
      .subscribe((categories) => {
        this.categoryList = categories
      });
  }
}
