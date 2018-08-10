import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Iuser } from '../user/iuser';
import 'rxjs/add/operator/map';
import { HttpRequest } from '@angular/common/http/src/request';


@Injectable()
export class UserListService {

  constructor(private http: HttpClient) {

  }

  LoadUserListService():Observable<Iuser> {

    return this.http.get<Iuser>('/api/Users');
  }

}
