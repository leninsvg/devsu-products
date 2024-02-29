import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CustomValidators } from '../../core/validators/custom.validators';
import { CustomAsyncValidators } from '../../core/validators/custom-async.validators';
import { CustomErrorMessageComponent } from '../../core/components/custom-error-message/custom-error-message.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomErrorMessageComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {
  public productForm: FormGroup;
  protected flow: string;
  public title: string;
  private flowStrategy: any;

  constructor(
    private formBuilder: FormBuilder,
    private customValidators: CustomValidators,
    private customAsyncValidators: CustomAsyncValidators,
    private productService: ProductService,
    private router: Router,
    private activateRouter: ActivatedRoute,
  ) {
    this.initVariables();
    this.flowStrategyHandler(this.flow)
  }

  public flowStrategyHandler(flow: string): void {
    if (!this.flowStrategy[flow]) {
      return;
    }
    this.flowStrategy[flow]();
  }

  protected async updateProduct(): Promise<void> {
    if (this.productForm.invalid) {
      return;
    }
    const product = this.productForm.getRawValue();
    await lastValueFrom(this.productService.updateProduct(product));
    this.router.navigate(['/products']).then();
  }


  public async createProduct(): Promise<void> {
    if (this.productForm.invalid) {
      return;
    }
    const product = this.productForm.getRawValue();
    await lastValueFrom(this.productService.createProduct(product));
    this.router.navigate(['/products']).then();
  }

  protected initVariables(): void {
    this.flow = this.activateRouter.snapshot.params['flow'];
    this.initProductForm();
    this.listenDateRelease();
    this.initActionStrategy();
  }

  public initProductForm(): void {
    this.productForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.customAsyncValidators.existProduct]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, this.customValidators.minDate(new Date())]],
      date_revision: [{value: '', disabled: true}],
    });
  }

  private listenDateRelease(): void {
    this.productForm.get('date_release')?.valueChanges.subscribe(date => {
      if (!date) {
        return;
      }
      const dateFragments = date.split('-');
      dateFragments[0] = Number(dateFragments[0]) + 1;
      this.productForm.get('date_revision')?.setValue(dateFragments.join('-'));
    });
  }

  private initActionStrategy(): void {
    this.flowStrategy = {
      create: () => {
        this.title = 'Formulario de Registro';
      },
      edith: async () => {
        debugger
        this.title = 'Formulario de Actualizacion';
        const product = {...this.activateRouter.snapshot.queryParams};
        product['date_release'] = product['date_release'].split('T')[0];
        product['date_revision'] = product['date_revision'].split('T')[0];
        this.productForm.reset(product);
        this.productForm.get('id')?.disable();
      }
    }
  }
}
