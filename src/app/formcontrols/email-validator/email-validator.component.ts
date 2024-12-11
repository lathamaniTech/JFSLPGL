import {
  Component,
  OnInit,
  Output,
  forwardRef,
  EventEmitter,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-validator',
  templateUrl: './email-validator.component.html',
  styleUrls: ['./email-validator.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailValidatorComponent),
      multi: true,
    },
  ],
})
export class EmailValidatorComponent implements OnInit, ControlValueAccessor {
  @Output('onSendOTP') onSendOTP = new EventEmitter();
  @Input() disable: boolean;
  constructor() {
    console.log('EmailValidatorComponent');
  }
  email = '';
  onChange = (val: any) => {};

  onTouched = () => {};

  writeValue(obj: any): void {
    console.log(`writeValue => ${obj}`);
    this.email = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit() {}

  changeInput() {
    console.log('changeInput....');
  }

  sendOTP() {
    setTimeout(() => {
      this.onSendOTP.emit('12345');
    }, 1000);
  }
}
