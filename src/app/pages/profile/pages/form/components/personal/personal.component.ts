import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared/utils';
import { Dictionaries } from '@app/store/dictionaries';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';

export interface PersonalForm {
  name: string;
  photoURL: string;
  country: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit, OnDestroy {

  @Input() value!: PersonalForm;
  @Input() dictionaries!: Dictionaries | null;

  @Output() changed = new EventEmitter<PersonalForm>();

  form!: FormGroup;
  regexErrors = regexErrors;

  private destroy = new Subject<any>();

  constructor( private stepper: StepperService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      photoURL: [null],
      name: [null, {
        updateOn: 'blur', validators: [
          Validators.required,
          Validators.maxLength(128)
        ]
      }],
      country: [null, {
        updateOn: 'change', validators: [
          Validators.required
        ]
      }]
    });

    if(this.value){
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe(takeUntil(this.destroy)).subscribe((type) => {
      //type == 'next'
      if(!this.form.valid){
        markFormGroupTouched(this.form);
        this.form.updateValueAndValidity();
        this.cdr.detectChanges();
      }else{
        this.changed.emit(this.form.value);
      }
      this.stepper[type].next(this.form.valid);
    });

  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  onPhotoChanged(url: any) : void {
    console.log('url', url);
    if(url){
      this.form.controls['photoURL'].setValue(url);
    }
  }

}
