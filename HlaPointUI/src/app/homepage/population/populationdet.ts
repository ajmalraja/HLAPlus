
import { IPopulation } from './ipopulation';

export class Populationdet implements IPopulation {

  Id:number;
  Name:string;
  Description:string;
  CreatedDateTime:Date;
  LastModifiedDateTime:Date;
  CreatedBy:string;
  LastModifiedByUser:string;
  USerName:string;
  Isdeleted:boolean;
}


