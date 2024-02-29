import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, of } from 'rxjs';
import { ProductModel } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let products: ProductModel[];
  let product: ProductModel;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({});
    service = new ProductService(httpClientSpy);
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
    ]
    product = {
      id: 'id3',
      description: 'description',
      name: 'name',
      logo: 'logo',
      date_release: 'date_release',
      date_revision: 'date_revision'
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts', async () => {
    httpClientSpy.get.and.returnValue(of(products));
    const auxProducts = await lastValueFrom(service.getProducts());
    expect(auxProducts).toEqual(products);
  });

  it('createProduct', async () => {
    httpClientSpy.post.and.returnValue(of(product));
    const auxProduct = await lastValueFrom(service.createProduct(product));
    expect(auxProduct).toEqual(product);
  });

  it('updateProduct', async () => {
    httpClientSpy.put.and.returnValue(of(product));
    const auxProduct = await lastValueFrom(service.updateProduct(product));
    expect(auxProduct).toEqual(product);
  });

  it('verificationProduct', async () => {
    httpClientSpy.get.and.returnValue(of(true));
    const existProduct = await lastValueFrom(service.verificationProduct('001'));
    expect(existProduct).toBeTruthy();
  });

  it('deleteProduct', async () => {
    httpClientSpy.delete.and.returnValue(of(null));
    await lastValueFrom(service.deleteProduct('001'));
    expect(httpClientSpy.delete.calls.count()).toBe(1);
  });
});
