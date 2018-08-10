import { IGridcolumnconfig } from './igridcolumnconfig';

export class Gridcolumnconfig implements IGridcolumnconfig {
  gridname:string;
  fieldname:string;
  titlename:string;
  width:string;
  hiddenstate:boolean;
  columnchanged:boolean;
  filterType:string;
  datefiled:boolean;
  childColumnName:string;
  childColumnType:string;
  tableName:string;
}

