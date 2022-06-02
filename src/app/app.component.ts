import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUsers from './store/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-app';
  isAuthorized$ !: Observable<boolean>;

  constructor( private store: Store<fromRoot.State>){

  }

  ngOnInit(){
    this.isAuthorized$ = this.store.pipe(select(fromUsers.getIsAuthorized));
    this.store.dispatch(new fromUsers.Init())
    this.store.dispatch(new fromDictionaries.Read());
  }

  onSignOut(): void{
    this.store.dispatch(new fromUsers.SignOutEmail());
  }
}
