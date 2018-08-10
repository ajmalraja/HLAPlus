import { Action } from '@ngrx/store';

export const LOAD_HAPLOTYPE = 'LOAD_HAPLOTYPE';
export const LOAD_HAPLOTYPE_SUCESS = 'LOAD_HAPLOTYPE_SUCESS';
export const LOAD_CHART_DATA = 'LOAD_CHART_DATA';
export const LOAD_CHART_DATA_SUCESS = 'LOAD_CHART_DATA_SUCESS';
export const LOAD_DOCUMENT_LIST = 'LOAD_DOCUMENT_LIST';
export const LOAD_DOCUMENT_LIST_SUCESS = 'LOAD_DOCUMENT_LIST_SUCESS';

export class LoadHaplotype implements Action {

  readonly type = LOAD_HAPLOTYPE;

  constructor() {

  }

}

export class LoadHaplotypeSucess implements Action {

  readonly type = LOAD_HAPLOTYPE_SUCESS;

  constructor(public payload: any) {

  }

}
export class LoadChartData implements Action {

  readonly type = LOAD_CHART_DATA;

  constructor() {

  }

}

export class LoadChartDataSucess implements Action {

  readonly type = LOAD_CHART_DATA_SUCESS;

  constructor(public payload: any) {

  }

}

export class LoadDocument implements Action {

  readonly type = LOAD_DOCUMENT_LIST;
  constructor() {
  }

}

export class LoadDocumentSucess implements Action {

  readonly type = LOAD_DOCUMENT_LIST_SUCESS;

  constructor(public payload: any) {

  }

}


export type Action = LoadHaplotype | LoadHaplotypeSucess | LoadChartData | LoadChartDataSucess|LoadDocument|LoadDocumentSucess;
