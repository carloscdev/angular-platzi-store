import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductInterface } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() productList: ProductInterface[] = [];

  @Output() showProductDetail = new EventEmitter<string>();

  onShowProductDetail(id: string) {
    this.showProductDetail.emit(id);
  }
}
