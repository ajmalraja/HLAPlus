import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';


export const saveFile = (blobContent: Blob, fileName: string) => {
  const blob = new Blob([blobContent], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};


