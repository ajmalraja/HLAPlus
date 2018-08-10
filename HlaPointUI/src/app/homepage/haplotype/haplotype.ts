import { IHaplotype } from './ihaplotype';

export class Haplotype implements IHaplotype {

  Haplotype:string;
  Count:number;
  Frequency:number;
  LinkageDisEquilibrium:number;
  populationName;string;
  CreatedDateTime: string;
  LastModifiedDateTime:string;
  CreatedByUser:string;
  LastModifiedUser:string;
  isDeleted:boolean;
  Id:number;

}
