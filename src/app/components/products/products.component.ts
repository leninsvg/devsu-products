import { Component } from '@angular/core';
import { DatePipe, JsonPipe, NgForOf } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { CustomPaginatorComponent } from '../../core/components/custom-paginator/custom-paginator.component';
import { ProductModel, ProductPage } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsPipe } from './pipes/filter-products.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    CustomPaginatorComponent,
    RouterLink,
    DatePipe,
    FormsModule,
    FilterProductsPipe,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  protected filterControl: FormControl;
  protected filterForm: FormGroup;
  protected productPage: ProductPage;
  protected products: ProductModel[];

  constructor(
    private productService: ProductService,
    private filterProductsPipe: FilterProductsPipe,
    private formBuilder: FormBuilder
  ) {
    this.initVariables();
    this.getProducts().then();
  }

  protected async deleteProduct(id: string): Promise<void> {
    const product = this.products.find(product => product.id === id);
    if (!confirm(`Estas seguro de eliminar el producto ${product?.id}`)) {
      return;
    }
    await lastValueFrom(this.productService.deleteProduct(id));
    await lastValueFrom(this.productService.getProducts());
  }

  protected async changePageHandler(filter: any): Promise<void> {
    this.filterForm.patchValue(filter)
    this.productPage = this.getFilteredProducts();
  }

  private initVariables(): void {
    this.products = [];
    this.productPage = {
      items: [],
      total: 0
    };
    this.filterControl = new FormControl<string>('');
    this.initFilterForm();
    this.initFilterProductListener();
  }

  private async getProducts(): Promise<void> {
    this.products = await lastValueFrom(this.productService.getProducts());
    this.productPage = this.getFilteredProducts();
  }

  private getFilteredProducts(): ProductPage {
    const filter = this.filterForm.getRawValue();
    return this.filterProductsPipe.transform(this.products, filter)
  }

  private initFilterProductListener(): void {
    this.filterForm.get('filter')?.valueChanges.subscribe(() => {
      this.filterForm.patchValue({page: 1})
      this.productPage = this.getFilteredProducts();
    })
  }

  private initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      filter: [''],
      pageSize: [5],
      page: [1]
    });
  }
}