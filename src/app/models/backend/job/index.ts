import firebase from "firebase/compat";

export interface Job{
  title: string;
  salary: number;
  created:  firebase.firestore.FieldValue;
  updated?: firebase.firestore.FieldValue;
}
