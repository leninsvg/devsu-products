import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <div class="w-100 bg-white  text-dark-blue flex center content-center title">
      <img style="width: 50px" src="assets/images/pichincha_logo.jpg">
      <div class="flex flex-column">
        <div>BANCO</div>
        <div>PICHINCHA</div>
      </div>
    </div>
  `
})
export class HeaderComponent {

}
