import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-app';

  constructor(private fs: AngularFirestore){

  }

  ngOnInit(){
    // this.fs.collection('test').snapshotChanges().subscribe( p => {
    //   console.log(p.map( x=> x.payload.doc.data()));
    // })
  }

}
