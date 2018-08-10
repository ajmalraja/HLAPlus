import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { UserToken } from '../login.models/user-token';
import { UserCredentials } from '../login.models/user-credentials';
import 'rxjs/add/operator/map';
import { IuserToken } from '../login.models/iuser-token';
import { HttpRequest } from '@angular/common/http/src/request';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {

   }

    validateUserGetToken(userDetails: UserCredentials): Observable<IuserToken> {


         return this.http.post<IuserToken>('/token' , 'grant_type=password&' + 'username='
                              + userDetails.UserName + '&password=' + userDetails.PassWord + '&client_id=' + userDetails.UserName);



    }

    RefreshToken(userdet: UserToken): Observable<IuserToken> {


      return this.http.post<IuserToken>('/token' , 'grant_type=refresh_token&' + 'client_id='
                           + userdet.UserName + '&refresh_token=' + userdet.Refresh_token );



 }



}
