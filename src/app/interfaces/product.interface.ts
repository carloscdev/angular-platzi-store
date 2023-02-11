export interface ProductInterface {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: CategoryInterface;
  creationAt?: string;
  updatedAt?: string;
  taxes?: number;
}

export interface CreateProductDTO extends Omit<ProductInterface, 'id' | 'category' | 'creationAt' | 'updatedAt'> {
  categoryId : number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

export interface CategoryInterface {
  id: number;
  name: string;
  image: string;
  creationAt?: string;
  updatedAt?: string;
}
