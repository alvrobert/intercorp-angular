import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: any[] = [];

  constructor(private fb: FormBuilder,
              private _clientService: ClientService,
              private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this._clientService.getClients().subscribe(data => {
      this.clients = [];
      data.forEach((element:any) => {
        this.clients.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  deleteClient(id: string) {
    this._clientService.deleteClient(id).then(() => {
      this.toastr.error('El Cliente fue eliminado con exito!!', 'Cliente Eliminado', {
        positionClass: 'toast-bottom-right'
      })
    }).catch(error => {
      console.log(error);
    })
  }
}
