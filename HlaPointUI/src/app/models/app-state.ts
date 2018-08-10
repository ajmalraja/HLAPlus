import { IuserToken } from '../account/login.models/iuser-token';
import { ICurrentroute } from './Icurrentroute';
import { Haplotype } from '../homepage/haplotype/haplotype';
import { IHaplotype } from '../homepage/haplotype/ihaplotype';
import { IPopulation } from '../homepage/population/ipopulation';
import { Iuser } from '../account/user/iuser';
import { IGridcolumnconfig } from './igridcolumnconfig';
import { Iadvancesearch } from './iadvancesearch';
import { IHaplotypesession } from './ihaplotypesession';



export interface  AppState {
userdetials: IuserToken;
currentRouteDet: ICurrentroute;
Haplotypelist: IHaplotypesession;
Populationlst:IPopulation[];
UserList:Iuser[];
UpdatedPopulation:IPopulation;
UpdatedHaplotype:IHaplotype;
GridColumnDet:IGridcolumnconfig[];
AdvanceSearchDet:Iadvancesearch[];

}



