import { IHaplotype } from '../homepage/haplotype/ihaplotype';
import { Ichartdata } from './ichartdata';
import {Idocumentdet} from './idocumentdet'

export interface IHaplotypesession {

  haplotypedata:IHaplotype[];
  chartData:Ichartdata[];
  documentlist:Idocumentdet[];
}
