import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Errordetails } from './models/errordetails';

@Injectable()
export class SystemloggingService {

  constructor(private http:HttpClient) { }

  postErrorMessage(errrdet:Errordetails)
  {
   return  this.http.post('/api/SystemLogging',errrdet);
  }

}
