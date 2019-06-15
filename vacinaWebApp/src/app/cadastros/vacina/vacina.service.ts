import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  save(vacina: any) : Observable<any>{
    console.log(vacina)
    return this.http.post(environment.urlWebAPI + "Vacina/", vacina)
      .catch((error: any) => Observable.throw(error.error));
  }

  put(vacina: any) : Observable<any>{
    console.log(vacina)
    return this.http.put(environment.urlWebAPI + "Vacina/" + vacina.id, vacina)
      .catch((error: any) => Observable.throw(error.error));
  }  

  getAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Vacina/")
    ._catch((error: any) => Observable.throw(error.error));
  }  

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Vacina/"+id)
    ._catch((error: any) => Observable.throw(error.error));
  }    

  delete(id: number) : Observable<any> {
    return this.http.delete(environment.urlWebAPI + "Vacina/" + id)
      .catch((error: any) => Observable.throw(error.error));    
  }

  edit(vacina: any) : Observable<any> {
    return this.http.put(environment.urlWebAPI + "Vacina/", vacina)
      .catch((error: any) => Observable.throw(error.error));    
  }    

}
