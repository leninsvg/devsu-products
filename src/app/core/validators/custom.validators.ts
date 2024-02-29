import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(
    private datePipe: DatePipe
  ) {
  }
  public minDate(requiredDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control?.value) {
        return null;
      }
      const date = control.value;
      if (date >= this.datePipe.transform(requiredDate, 'yyyy-MM-dd')!) {
        return null;
      }
      return {minDate: {date, requiredDate}};
    };
  }
}
