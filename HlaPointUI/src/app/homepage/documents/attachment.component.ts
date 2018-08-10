import { Component, OnInit } from '@angular/core';
import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as HaplotypeAction from '../homepage.actions/haplotype.action';
import { AppState } from '../../models/app-state';
import { Idocumentdet } from '../../models/idocumentdet';
import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {

  constructor(private store: Store<AppState>, private http: HttpClient) { }
  public saveurl = '/api/DocumentService/UploadFile?ModuleID=1';
  public events: string[] = [];
  public imagePreviews: FileInfo[] = [];
  public uploadRemoveUrl = 'removeUrl';
  public documentlist$: Observable<any>;
  public documentlist: Array<Idocumentdet> = [];
  public spinnervisibility= false;
  ngOnInit() {

    this.store.dispatch(new HaplotypeAction.LoadDocument());
    this.documentlist$ = this.store.select(store => store.Haplotypelist.documentlist);


  }


  public clearEventHandler(e: ClearEvent): void {
    this.log('Clearing the file upload');
    this.imagePreviews = [];
  }

  public completeEventHandler() {
    this.log(`All files processed`);
    this.imagePreviews = [];
    this.store.dispatch(new HaplotypeAction.LoadDocument());
    this.documentlist$ = this.store.select(store => store.Haplotypelist.documentlist);
  }

  private log(event: string): void {
    this.events.unshift(`${event}`);
  }

  downloadfile(Id: number, FileName: string) {
    this.spinnervisibility=true;
    const url = '/api/DocumentService/DownloadFile?ModuleID=1&Id=' + Id;


    // Process the file downloaded
    this.http.get(url, { responseType: 'blob' }).subscribe(res => {
      saveFile(res, FileName);
    });


    const saveFile = (blobContent: Blob, fileName: string) => {
      const blob = new Blob([blobContent], { type: 'application/octet-stream' });
      saveAs(blob, fileName);
      this.spinnervisibility = false;
    };

  }
}
