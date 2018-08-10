import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Gridcolumnconfig} from '../../models/gridcolumnconfig'
import { IGridcolumnconfig } from '../../models/igridcolumnconfig';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import { AppState } from '../../models/app-state';
@Injectable()
export class UserprefService {
  public userInfo$:Observable<any>;
  public routeInof$:Observable<any>;
  constructor(private http:HttpClient,private store: Store<AppState>) { }


  SaveUserPreference(key:string,griddet:Array<any>,userName:string)
  {

    const params=new HttpParams()
    .set('key',key)
    .set('username',userName);
    return this.http.post<IGridcolumnconfig>('/api/UserPreferences', griddet,{params,
      headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())} );
  }

  GetUserPerference(key:string,userName:string):Observable<Gridcolumnconfig>
  {

   const params=new HttpParams()
   .set('key',key )
   .set('userName',userName );

   return this.http.get<Gridcolumnconfig>('/api/UserPreferences',{params,
    headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())})

  }

  GetAccessToken()
  {
    var access_token:string='';

    this.userInfo$ = this.store.select(state => state.userdetials.Access_token);
    this.userInfo$.subscribe(data =>{

          access_token=data;

        });



   return access_token;

  }
}
