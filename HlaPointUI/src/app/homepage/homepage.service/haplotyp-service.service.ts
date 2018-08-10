import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Haplotype } from '../haplotype/haplotype';
import 'rxjs/add/operator/map';
import { HttpRequest } from '@angular/common/http/src/request';
import { IHaplotype } from '../haplotype/ihaplotype';
import {Store} from '@ngrx/store';
import { AppState } from '../../models/app-state';
import { Ichartdata } from '../../models/ichartdata';
import { Idocumentdet } from '../../models/idocumentdet';

@Injectable()
export class HaplotypeService {
  public userInfo$:Observable<any>;
  public routeInof$:Observable<any>;
  constructor(private http: HttpClient,private store: Store<AppState>) {

  }

   LoadHaplotypeService(): Observable<IHaplotype> {

        return this.http.get<IHaplotype>('/api/Haplotype',
        {headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())});



   }

   LoadCharDataService():Observable<Ichartdata>{

    return this.http.get<Ichartdata>('/api/Haplotype/GetChartData',
    {headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())});

   }

   LoadDocumentList():Observable<Idocumentdet>{

    return this.http.get<Idocumentdet>('/api/DocumentService/GetFileList?ModuleID=1',
    {headers:new HttpHeaders().set('Authorization','Bearer ' + this.GetAccessToken())});

   }
   UpdateHaplotype (newHaplotype: IHaplotype):Observable<IHaplotype>{

    const params =new HttpParams()
          .set('PopulationName',newHaplotype.populationName)
          .set('Haplotype', newHaplotype.Haplotype)
          .set('UserName',newHaplotype.LastModifiedUser)
          .set('Id', newHaplotype.Id.toString())
          .set('isDeleted',newHaplotype.isDeleted.toString())
          .set('Count',newHaplotype.Count.toString())
          .set('Frequency',newHaplotype.Frequency.toString())
          .set('LinkDisEq',newHaplotype.LinkageDisEquilibrium.toString());

    return this.http.get<IHaplotype>('/api/Haplotype',{params} );

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
