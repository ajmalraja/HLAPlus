import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { AdvanceSearch } from '../../models/advancesearch'
import 'rxjs/add/operator/map';
import { HttpRequest } from '@angular/common/http/src/request';
import { Iadvancesearch } from '../../models/iadvancesearch';
import {Store} from '@ngrx/store';
import { AppState } from '../../models/app-state';

@Injectable()
export class AdvancesearchService {
  public userInfo$:Observable<any>;
  public routeInof$:Observable<any>;
  constructor(private http: HttpClient,private store: Store<AppState>) {

   }

 LoadSavedQuery(searchreqdet:AdvanceSearch,):Observable<AdvanceSearch>
 {

  const params=new HttpParams()
  .set('UserName',searchreqdet.username)
  .set('gridName',searchreqdet.gridname);
  return this.http.get<AdvanceSearch>('/api/AdvanceSearch/GetQueries',{params,
    headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())})

 }

 SaveQuery(query:Array<any>,description:string,userName:string,gridName:string)
 {
  const params=new HttpParams()
  .set('UserName',userName)
  .set('Description',description)
    .set('GridName',gridName);


   return this.http.post<Iadvancesearch>('/api/AdvanceSearch/SaveQuery', query,{params,
    headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())} );
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
