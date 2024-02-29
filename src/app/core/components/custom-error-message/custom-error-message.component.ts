import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { DatePipe, JsonPipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'custom-error-message',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    JsonPipe,
    DatePipe
  ],
  templateUrl: './custom-error-message.component.html',
  styleUrl: './custom-error-message.component.scss',
})
export class CustomErrorMessageComponent {
  @Input()
  public customControl: AbstractControl;
  @Input()
  public displayName: string;

  constructor() {
    this.customControl = new FormControl();
    this.displayName = '';
  }
}
