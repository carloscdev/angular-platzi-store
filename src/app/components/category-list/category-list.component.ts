import { Component, Input } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  @Input() categoryList: CategoryInterface[] = [];

}
