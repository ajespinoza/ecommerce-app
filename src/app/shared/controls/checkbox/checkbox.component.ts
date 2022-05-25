import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ControlItem, Value } from '../select/select.component';
export { ControlItem, Value } from '../select/select.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

  value!: Value[];
  isDisabled!: boolean;

  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();

  constructor() { }

  ngOnInit(): void {
  }

  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}

  writeValue(value: Value[]): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void{
    this.isDisabled = isDisabled;
  }

  onChanged(value: Value, checked: Event): void{
    const { target } = checked;
    const result = (target as HTMLInputElement).checked;

    const selected = this.getSelected(value, result);

    this.value = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  private getSelected(value: Value, checked: boolean): Value[]{
    const selected: Value[] = this.value ? [...this.value] : [];
    if(checked){
      if(!selected.includes(value)){
        selected.push(value);
      }
    }else{
        const index = selected.indexOf(value);
        selected.splice(index,1);
    }

    return selected.length ? selected : [];
  }

  isChecked(value: Value): boolean{
    return this.value && this.value.includes(value);
  }

}
