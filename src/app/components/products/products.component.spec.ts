import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';
import { DatePipe } from '@angular/common';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductModel } from '../../models/product.model';
const PRODUCTS  = [
  {
    id: 'id0',
    description: 'description',
    name: 'name',
    logo: 'logo',
    date_release: '2024-03-01T00:00:00.000+00:00',
    date_revision: '2025-03-01T00:00:00.000+00:00'
  },
  {
    id: 'id1',
    description: 'description',
    name: 'name',
    logo: 'logo',
    date_release: '2024-03-01T00:00:00.000+00:00',
    date_revision: '2025-03-01T00:00:00.000+00:00'
  },
  {
    id: 'id2',
    description: 'description',
    name: 'name',
    logo: 'logo',
    date_release: '2024-03-01T00:00:00.000+00:00',
    date_revision: '2025-03-01T00:00:00.000+00:00'
  },
  {
    id: 'id3',
    description: 'description',
    name: 'name',
    logo: 'logo',
    date_release: '2024-03-01T00:00:00.000+00:00',
    date_revision: '2025-03-01T00:00:00.000+00:00'
  }
];
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let products: ProductModel[];

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    productServiceSpy.getProducts.and.returnValue(of(PRODUCTS));
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        DatePipe,
        FilterProductsPipe,
        FormBuilder,
        {
          provide: ProductService,
          useValue: productServiceSpy
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validateProperties', () => {
    // expect(component.filterForm.contains('filter')).toBeTruthy();
    // expect(component.filterForm.contains('pageSize')).toBeTruthy();
    // expect(component.filterForm.contains('page')).toBeTruthy();
  })
  it('changePageHandler', fakeAsync(() => {
    component.changePageHandler({page: 2, pageSize: 5});
    fixture.detectChanges()
    flush()
    expect(component.filterForm.get('page')?.value).toBe(2);
    expect(component.filterForm.get('pageSize')?.value).toBe(5);
  }))

  it('deleteProduct confirm true', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    productServiceSpy.deleteProduct.and.returnValue(of(undefined));
    component.deleteProduct('id0');
    fixture.detectChanges()
    flush()
    expect(productServiceSpy.deleteProduct.calls.count()).toBe(1);
  }))

  it('deleteProduct confirm false', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteProduct('id0');
    fixture.detectChanges()
    flush()
    expect(productServiceSpy.deleteProduct.calls.count()).toBe(0);
  }))
});
