import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyClAyTsw1Wgv0yoXwd6MSiS7ub0TW0lxrs",
    authDomain: "chatapp-97d6c.firebaseapp.com",
    projectId: "chatapp-97d6c",
    storageBucket: "chatapp-97d6c.appspot.com",
    messagingSenderId: "924705447399",
    appId: "1:924705447399:web:5235e4398cb2074761f142",
    measurementId: "G-8R32TVMN0D"
  };
let app;

if(firebase.apps.length===0){
   app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app();
}

const db=app.firestore();
const auth=firebase.auth();

export {db,auth}