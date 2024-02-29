import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CustomAsyncValidators {
  constructor(
    private productService: ProductService
  ) {
  }

  public existProduct = async (control: AbstractControl): Promise<ValidationErrors | null> => {
    if (!control.value || control.disabled) {
      return null;
    }
    const existProduct: any = await lastValueFrom(this.productService.verificationProduct(control.value));
    if (!existProduct) {
      return null;
    }
    return {existProduct: {error: 'EXIST_PRODUCT'}};
  };
}
