import { Pipe, PipeTransform } from '@angular/core';
import { FilterProductModel, ProductModel, ProductPage } from '../../../models/product.model';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: ProductModel[], filter: FilterProductModel): ProductPage {
    const startIndexProduct = ((filter.page - 1) * filter.pageSize)
    const totalItems: ProductModel[] = products.filter(product => {
      // @ts-ignore
      return Object.keys(product).some(productProperty => product[productProperty]
        .toString().indexOf(filter.filter || '') >= 0)
    });
    return {
      items: totalItems.slice(startIndexProduct, startIndexProduct + filter.pageSize),
      total: totalItems.length
    };
  }

}
