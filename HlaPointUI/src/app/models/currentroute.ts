import { ICurrentroute } from './Icurrentroute';

export class Currentroute implements ICurrentroute  {



path: string;
description: string;
logopath: string;
tokenValidity: boolean;
errordescription:string;
expdate:Date;
commontfilterText:string;
AdvancedfilterText:string;
}
