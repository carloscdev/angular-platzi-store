import { Component,  Input} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  imageDefault: string = '../../../assets/images/error-image.jpg'
  image: string = '';
  text: string = '';

  @Input('image')
  set changeImage(newImage: string) {
    this.image = newImage;
  }

  @Input('text')
  set changeText(newText: string) {
    this.text = newText;
  }

  loadImageDefault() {
    this.image = this.imageDefault;
  }
}
