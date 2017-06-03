import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje:string="";
  elemento:any;

  constructor(public _cs:ChatService) 
  {
  	 this._cs.cargarMensajes().subscribe(
  		()=>{
  		  console.log("Mensajes Cargados..");  		
  	    setTimeout(()=>this.elemento.scrollTop=this.elemento.scrollHeight,50);
  	     })
  }
  //Una vez que se carga la página obtengo el elemento contenedor dde los mensajes
  ngOnInit() 
  {
  	this.elemento=document.getElementById("app-mensajes");
  }

  enviar(){
  	if(this.mensaje.length==0)
  	{
  		return ;
  	}
  	this._cs.agregarMensaje(this.mensaje).
  	         then(()=>console.log("Hecho!")).
  	         catch(error=>console.log(error));
  	//
  	console.log(this.mensaje);
  	this.mensaje="";
  }


 
}
