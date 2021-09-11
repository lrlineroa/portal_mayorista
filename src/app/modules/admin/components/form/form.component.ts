import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { isArray, isFunction } from 'util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;

  @Input() title: string = '';
  @Input() config: FormConfig = {};
  @Input() actions: string;

  constructor() {
  }

  ngOnInit() {
    const controls: { [k: string]: FormControl } = {};
    Object.entries(this.config.controls || {}).forEach(([k, c]) => {
      controls[k] = new FormControl('', c.validators || [])
    });
    this.form = new FormGroup(controls);
  }

  isType(c: CustomFormControl, t: CustomControlType | CustomControlType[]) {
    if (!isArray(t))
      t = [t] as CustomControlType[];
    return !!(t as CustomControlType[]).find(t => (c.type || 'input') === t);
  }

  public get values() {
    return this.form.value;
  }

  actionExec(action: FormAction) {
    if (action.callback && isFunction(action.callback))
      action.callback(this.values, this.form);
  }
}

export interface FormAction {
  callback: (values, form) => void;
  icon?: string;
  title?: string;
  color?: string;
}

export interface FormConfig {
  controls?: {
    [key: string]: CustomFormControl;
  }
}

export type CustomControlType = 'select' | 'input';
export interface CustomFormControl {
  type?: CustomControlType;
  icon?: string;
  title?: string;
  placeholder?: string;
  validators?: ValidatorFn[];
  controlOptions?: CustomControlOptions;
  callback?: (values, form) => void;
}

export interface CustomInputOptions {
  type: 'text' | 'number' | 'date' | 'file';
}
export interface CustomSelectOptions {
  options: {
    text: string, value: string
  }[]
}

export type CustomControlOptions = CustomInputOptions | CustomSelectOptions;

