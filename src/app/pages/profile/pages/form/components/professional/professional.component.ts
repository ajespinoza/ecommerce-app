import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched, regexErrors } from '@app/shared/utils';
import { Dictionaries } from '@app/store/dictionaries';
import { Subject, takeUntil } from 'rxjs';
import { StepperService } from '../stepper/services';
import { EmployeeForm } from './roles/employee/employee.component';
import { RecruiterForm } from './roles/recruiter/recruiter.component';

export interface ProfessionalForm {
  about: string;
  roleId: string;
  role: RecruiterForm | EmployeeForm;
}

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalComponent implements OnInit, OnDestroy {

  @Input() value !: ProfessionalForm;
  @Input() dictionaries !: Dictionaries | null;

  @Output() changed = new EventEmitter<ProfessionalForm>();

  form !: FormGroup;
  regexErrors = regexErrors;

  constructor( private stepper: StepperService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef) { }

  private destroy = new Subject<any>();

  ngOnInit(): void {
    this.form = this.fb.group({
      roleId: [null, {
        updateOn: 'change', validator: [
          Validators.required
        ]
      }],
      about: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }]
    });

    if(this.value){
      this.form.patchValue(this.value);
    }

    this.stepper.check$.pipe( takeUntil(this.destroy)).subscribe((type) => {
      //type === cumplete
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
}
