import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.url = environment.apiBaseUrl + '/bp/products';
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.url}`)
  }

  public createProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.post<ProductModel>(`${this.url}`, product);
  }

  public updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.httpClient.put<ProductModel>(`${this.url}`, product);
  }

  public deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}`, {params: {id}});
  }

  public verificationProduct(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.url}/verification`, {params: {id}});
  }
}
