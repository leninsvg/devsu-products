import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';
import { DatePipe } from '@angular/common';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
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
});
