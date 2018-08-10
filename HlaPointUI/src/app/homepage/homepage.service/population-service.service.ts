import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { IPopulation } from '../population/ipopulation';
import 'rxjs/add/operator/map';
import { HttpRequest } from '@angular/common/http/src/request';
import { IHaplotype } from '../haplotype/ihaplotype';
import {Store} from '@ngrx/store';
import { AppState } from '../../models/app-state';



@Injectable()
export class PopulationService {
public userInfo$:Observable<any>;
public routeInof$:Observable<any>;
  constructor(private http: HttpClient,private store: Store<AppState>) {

  }

   LoadPopulationService(): Observable<IPopulation> {



    return this.http.get<IPopulation>('/api/Populations',
    {headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())});



   }

   UpdatePopulation (newPopulation: IPopulation):Observable<IPopulation>{

    const params =new HttpParams()
          .set('Name',newPopulation.Name)
          .set('Description', newPopulation.Description)
          .set('UserName',newPopulation.USerName)
          .set('Id', newPopulation.Id.toString())
          .set('isDeleted',newPopulation.Isdeleted.toString());

    return this.http.get<IPopulation>('/api/Populations',
    {params,headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())} );

  }


  SubmitPopulationQuery(query:Array<any>): Observable<IPopulation> {

    let headers=new HttpHeaders();
    headers=headers.set('Content-Type', 'application/json; charset=utf-8')
    return this.http.post<IPopulation>('/api/AdvanceSearch/GetResult', query,
    {headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())} );

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
