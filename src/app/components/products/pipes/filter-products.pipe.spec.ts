import { FilterProductsPipe } from './filter-products.pipe';
import { ProductModel } from '../../../models/product.model';

describe('FilterProductsPipe', () => {
  let products: ProductModel[];
  beforeEach(() => {
    products = [
      {
        id: 'id0',
        description: 'description',
        name: 'name',
        logo: 'logo',
        date_release: 'date_release',
        date_revision: 'date_revision'
      },
      {
        id: 'id1',
        description: 'description',
        name: 'name',
        logo: 'logo',
        date_release: 'date_release',
        date_revision: 'date_revision'
      },
      {
        id: 'id2',
        description: 'description',
        name: 'name',
        logo: 'logo',
        date_release: 'date_release',
        date_revision: 'date_revision'
      },
      {
        id: 'id3',
        description: 'description',
        name: 'name',
        logo: 'logo',
        date_release: 'date_release',
        date_revision: 'date_revision'
      }
    ];

  });
  it('create an instance', () => {
    const pipe = new FilterProductsPipe();
    expect(pipe).toBeTruthy();
  });
  it('filter one product', () => {
    const pipe = new FilterProductsPipe();
    const filter = {
      page: 1,
      pageSize: 5,
      filter: 'id2'
    }
    const result = pipe.transform(products, filter);
    expect(result.items.length).toBe(1)
    expect(result.total).toBe(1)
  })

  it('filter all products', () => {
    const pipe = new FilterProductsPipe();
    const filter = {
      page: 1,
      pageSize: 5,
      filter: ''
    }
    const result = pipe.transform(products, filter);
    expect(result.total).toBe(products.length)
  })
});
