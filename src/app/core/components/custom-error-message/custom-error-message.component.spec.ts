import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { CustomErrorMessageComponent } from './custom-error-message.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomValidators } from '../../validators/custom.validators';
import { DatePipe } from '@angular/common';
import { CustomAsyncValidators } from '../../validators/custom-async.validators';
import { ProductService } from '../../../services/product.service';
import { of } from 'rxjs';

describe('CustomErrorMessageComponent', () => {
  let component: CustomErrorMessageComponent;
  let fixture: ComponentFixture<CustomErrorMessageComponent>;
  let customValidators: CustomValidators;
  let customAsyncValidators: CustomAsyncValidators;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['verificationProduct']);
    await TestBed.configureTestingModule({
      imports: [CustomErrorMessageComponent],
      providers: [DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    customValidators = new CustomValidators(new DatePipe('en-US'));
    customAsyncValidators = new CustomAsyncValidators(productServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate properties', () => {
    expect(component.customControl).toBeTruthy();
    expect(component.displayName).toBe('');
  })

  it('validate required error', () => {
    component.customControl = new FormControl('', [Validators.required]);
    component.customControl.markAsDirty();
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.danger'))?.nativeElement;
    expect(elem.innerHTML).toContain('Este campo es requerido');
  })

  it('validate minlength error', () => {
    component.customControl = new FormControl('123', [Validators.minLength(10)]);
    component.customControl.markAsDirty();
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.danger'))?.nativeElement;
    expect(elem.innerHTML).toContain('Porfavor ingrese el minimo de caracteres de 10');
  })

  it('validate maxlength error', () => {
    component.customControl = new FormControl('1234', [Validators.maxLength(3)]);
    component.customControl.markAsDirty();
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.danger'))?.nativeElement;
    expect(elem.innerHTML).toContain('Sobrepaso los caracteres maximo de 3');
  })

  it('validate minDate error', () => {
    component.customControl = new FormControl(new Date('2014-01-01'), [customValidators.minDate(new Date())]);
    component.customControl.markAsDirty();
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.danger'))?.nativeElement;
    expect(elem.innerHTML).toContain('La fecha seleccionada tiene que ser superior a la fecha minima de');
  })

  it('validate existProduct error', fakeAsync(() => {
    productServiceSpy.verificationProduct.and.returnValue(of(true));
    component.customControl = new FormControl('123',[], [customAsyncValidators.existProduct]);
    component.customControl.markAsDirty();
    flush();
    fixture.detectChanges();
    const elem: HTMLElement = fixture.debugElement.query(By.css('.danger'))?.nativeElement;
    expect(elem.innerHTML).toContain('Ya existe este registro');
  }))
});
