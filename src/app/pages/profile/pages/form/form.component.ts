import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StepperService } from './components/stepper/services';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromDictionaries from '@app/store/dictionaries';
import { PersonalForm } from './components/personal/personal.component';
import { ProfessionalForm } from './components/professional/professional.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit, OnDestroy {

  dictionaries$ !: Observable<fromDictionaries.Dictionaries>;
  dictionariesIsReady$ !: Observable<boolean>;
  private destroy = new Subject<any>();


  constructor( public stepper: StepperService,
                private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.dictionaries$ = this.store.pipe( select(fromDictionaries.getDictionaries)) as Observable<any>;
    this.dictionariesIsReady$ = this.store.pipe(select(fromDictionaries.getIsReady)) as Observable<boolean>;

    this.stepper.init([
      { key: 'professional', label: 'Professional'},
      { key: 'personal', label: 'Personal'},
    ]);

    this.stepper.complete$.pipe( takeUntil(this.destroy)).subscribe(() => {
      console.log('stepper completed')
    });

    this.stepper.cancel$.pipe( takeUntil(this.destroy)).subscribe(() => {
      console.log('stepper cancelled')
    })
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  onChangedPersonal(data: PersonalForm): void {
    console.log('personal data',data);
  }

  onChangedProfessional(data: ProfessionalForm): void {
    console.log('profesional data',data);
  }
}
