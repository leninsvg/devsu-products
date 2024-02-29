import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgForOf } from '@angular/common';
import { PaginatorModel } from '../../../models/paginator.model';
import { PagesPipe } from './pipes/pages.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'custom-paginator',
  standalone: true,
  imports: [
    NgForOf,
    PagesPipe,
    FormsModule
  ],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss'
})
export class CustomPaginatorComponent {
  @Output()
  public changePageHandler: EventEmitter<PaginatorModel>;
  @Input()
  public total: number;
  @Input()
  public page: number;
  protected pageSizes: number[];
  protected pageSize: number;

  constructor() {
    this.initVariables();
  }

  protected changePage(page: number): void {
    this.page = page;
    this.emitChangePageHandler();
  }

  protected changePageSize(): void {
    this.page = 1;
    this.emitChangePageHandler();
  }

  protected emitChangePageHandler(): void {
    this.changePageHandler.emit({page: this.page, pageSize: this.pageSize})
  }

  private initVariables(): void {
    this.pageSizes = [5, 10, 20];
    this.pageSize = 5;
    this.page = 1;
    this.total = 0;
    this.changePageHandler = new EventEmitter<PaginatorModel>();
  }


}
