import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { DatePipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ProductModel } from '../../models/product.model';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let activateRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let product: ProductModel;


  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['createProduct', 'updateProduct', 'verificationProduct']);
    activateRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      ['snapshot']: {params: {}}
    });

    await TestBed.configureTestingModule({
      imports: [FormProductComponent],
      providers: [
        DatePipe,
        {
          provide: ProductService, useValue: productServiceSpy
        },
        {
          provide: ActivatedRoute, useValue: activateRouteSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    product = {
      id: 'id0',
      description: 'description',
      name: 'name',
      logo: 'logo',
      date_release: 'date_release',
      date_revision: 'date_revision'
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('create flow', () => {
    component.flowStrategyHandler('create');
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.title'))?.nativeElement;
    expect(elem.innerHTML).toContain('Formulario de Registro');
  })

  it('Edith flow', fakeAsync(() => {
    productServiceSpy.verificationProduct.and.returnValue(of(true));
    activateRouteSpy.snapshot.queryParams = {...product};
    component.flowStrategyHandler('edith');
    flush()
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.title'))?.nativeElement;
    expect(elem.innerHTML).toContain('Formulario de Actualizacion');
  }))
});
