import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pages',
  standalone: true
})
export class PagesPipe implements PipeTransform {

  transform(total: number, pageSize: number): number[] {
    if (!total) {
      return [1];
    }
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
      pages.push(i)
    }
    return pages;
  }

}
