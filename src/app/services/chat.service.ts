import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { AngularFireAuth, AngularFireAuthProvider} from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { Mensaje } from '../interfaces/mensaje.interface';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ChatService {

  chats: FirebaseListObservable<any[]>;
  usuario:any={};
  //user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    if(localStorage.getItem("usuario"))
    {
      //Usuario Logado
      this.usuario=JSON.parse(localStorage.getItem("usuario"));
      console.log(this.usuario);
    }
    else
    {
      this.usuario=null;
    }
  }

  cargarMensajes()
  {
  	this.chats=this.db.list("chats",{
  		query:{
  			limitToLast:20,
  			orderByKey:true
  		}
  	});
  	return this.chats;
  }
  agregarMensaje(texto:string)
  {

    console.log(this.usuario);
  	let mensaje:Mensaje=
    {
  		nombre:this.usuario.user.displayName,
  		mensaje:texto,
      uid:this.usuario.user.uid
  	}
  	return this.chats.push(mensaje);
  }


   login(proveedor:string) 
   {

     if(proveedor =="google")
     {
       
    //this.afAuth.auth.login(new firebase.auth.GoogleAuthProvider());
     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
       data=>{
        
         this.usuario=data;
         localStorage.setItem('data',JSON.stringify(data));
       });
     }
     else
       if(proveedor=="twitter")
       {
         this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider).then(
         data=>{  
           this.usuario=data;
           localStorage.setItem('data',JSON.stringify(data));
         }
         );
     }
   }

   logout() 
   {
    localStorage.removeItem("usuario");
    this.usuario=null;
    this.afAuth.auth.signOut();
  }
  }

  

