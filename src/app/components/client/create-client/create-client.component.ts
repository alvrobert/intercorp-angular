import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  createClient: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Agregar Cliente';

  constructor(private fb: FormBuilder, 
              private _clientService: ClientService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createClient = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      dateBirth: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');    
  }

  ngOnInit(): void {
    if (this.id !== null ){
      this.edit();
    }
  }

  addEditClient(){
    this.submitted = true;
    if(this.createClient.invalid){
      return; 
    }
    if(this.id === null) {
      this.addClient();
    } else {
      this.editClient(this.id);
    }
  }

  addClient() {
    const client: any = {
      name : this.createClient.value.name,
      lastName : this.createClient.value.lastName,
      age : this.createClient.value.age,
      dateBirth : this.createClient.value.dateBirth,
      createDate: new Date(),
      updateDate: new Date()
    }
    this.loading = true;
    this._clientService.addClient(client).then(() => {
      this.toastr.success('El cliente fue registrado exitosamente!', 'cliente Registrado', {
        positionClass: 'toast-bottom-right'
      })
      this.loading = false;
      this.router.navigate(['/list-client'])
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editClient(id: string) {
    
    const client: any = {
      name : this.createClient.value.name,
      lastName : this.createClient.value.lastName,
      age : this.createClient.value.age,
      dateBirth : this.createClient.value.dateBirth,
      updateDate: new Date()
    }
    this.loading = true;
    this._clientService.editClient(id, client).then(() => {
      this.loading = false;
      this.toastr.info('Cliente modificado exitosamente', 'Cliente Modificado', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-client'])
    })
  }

  edit() {
    this.title = 'Editar Cliente'
    if(this.id !== null) {
      this.loading = true;
      this._clientService.getClient(this.id).subscribe(data => {
        this.loading = false;
        this.createClient.setValue({
          name: data.payload.data()['name'],
          lastName: data.payload.data()['lastName'],
          age: data.payload.data()['age'],
          dateBirth: data.payload.data()['dateBirth']
        })
      })
    }
  }
}
