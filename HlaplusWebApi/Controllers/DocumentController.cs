using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.IO;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.File;
using System.Diagnostics;
using HLAPoint.Domain.Entities;
using System.Net.Http.Headers;
using System.Web.Http.Results;

namespace HlaPoint.web.Controllers
{
    [RoutePrefix("api/DocumentService")]
    public class DocumentController : ApiController
    {
      
        private HLAPointModelContainer db = new HLAPointModelContainer();
        [Route("UploadFile")]

        public async Task<IHttpActionResult> UploadFile(int ModuleID)
        {

            try
            {
                var docconfigdet = GetDocumentShareDetails(ModuleID);
                if (!Request.Content.IsMimeMultipartContent())
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);


                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);
                var FileName = string.Empty;
                foreach (var file in provider.Contents)
                {
                    var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                    FileName = filename;
                    byte[] byteArray = await file.ReadAsByteArrayAsync();
                    Guid guid = Guid.NewGuid();


                    var upload = storeToFileServiceAzure(byteArray, docconfigdet.Id, guid.ToString() +  filename);

                    if (upload)
                    {
                        var docdet = new DocumentDetails
                        {
                            CreatedDate = DateTimeOffset.Now,
                            DocumentName = filename,
                            FileGuid = guid.ToString() + filename,
                            ModuleId = docconfigdet.Id
                        };
                        db.DocumentDetails.Add(docdet);
                        db.SaveChanges();
                    }
                    


                }

                return Json("Sucess");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }


           
        
        }

        [Route("DownloadFile")]
        public IHttpActionResult GetFile(int ModuleID ,int Id)
        {
            var filedet = db.DocumentDetails.Find(Id);
            
            var filebytes = getFileFromAzureFileService(ModuleID, filedet.FileGuid,false);

            MemoryStream ms = new MemoryStream(filebytes);

            HttpResponseMessage httpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StreamContent(ms)
            };

            httpResponseMessage.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("download")
            {
                FileName=filedet.DocumentName
            };

            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");

            ResponseMessageResult responseMessageResult = ResponseMessage(httpResponseMessage);
            return responseMessageResult;
        }

        [Route("GetFileList")]
        public IHttpActionResult GetFileList(int ModuleID)
        {
            var res=db.DocumentDetails.Select(d => new
            {
                Id = d.Id,
                FileName = d.DocumentName

            });

            return Json(res);
        }

        [Route("DeleteFile")]
        public IHttpActionResult DeleteFile(int ModuleID,int Id)
        {
            var filedet = db.DocumentDetails.Find(Id);

            try
            {
                var filebytes = getFileFromAzureFileService(ModuleID, filedet.FileGuid, true);
                db.DocumentDetails.Remove(filedet);
                db.SaveChanges();
                return Json("OK");
            }
           catch(Exception ex)
            {
                return Json(ex);
            }

        }
        
        

        /// <summary>
        /// Method for Uploading the file in to Azure file Service
        /// </summary>
        /// <param name="filebytes"></param>
        /// <param name="directoryname"></param>
        /// <param name="filename"></param>
        /// <returns></returns>

        private bool storeToFileServiceAzure(byte[] filebytes, int ModuleID,string filename)
        {

            var docconfigdet = GetDocumentShareDetails(ModuleID);
            string[] directorydet = docconfigdet.ChildDirectory.Split('/');

            if (filebytes == null) throw new ArgumentNullException("File stream cannot be empty");           
            if (filename == null) throw new ArgumentNullException("File Name cannot be empty");
            if (filebytes.Length == 0) throw new ArgumentOutOfRangeException("File stream is empty");
            

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            CloudFileClient fileClient = storageAccount.CreateCloudFileClient();
            CloudFileShare share = fileClient.GetShareReference(docconfigdet.RootDirectory.ToString());
            if (share.Exists())
            {
                CloudFileDirectory[] filedirectory = new CloudFileDirectory[directorydet.Length];
                var i = 0;
                CloudFileDirectory rootdir = share.GetRootDirectoryReference();

                foreach (var dir in directorydet)
                {
                    if (i == 0)
                    {
                        filedirectory[i] = rootdir.GetDirectoryReference(dir);
                        
                    }
                    else
                    {
                        filedirectory[i] = filedirectory[i - 1].GetDirectoryReference(dir);
                    }
                   

                    if (!filedirectory[i].Exists())
                    {
                        throw new ArgumentOutOfRangeException("File Share Does not Exists");
                    }
                    i++;
                }

                i--;
                try
                {
                    CloudFile uploadfile = filedirectory[i].GetFileReference(filename);

                    using (var ms = new MemoryStream(filebytes))
                    {
                        uploadfile.UploadFromStream(ms);
                    }
                    return true;
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.ToString());
                }
            }
            else
            {
                throw new ArgumentOutOfRangeException("File Share Does not Exists");
            }
 
            
        }

        /// <summary>
        /// Method to get the File from Azure File Service Using FileGuid and Directory Name
        /// </summary>
        /// <param name="directoryname"></param>
        /// <param name="filename"></param>
        /// <returns></returns>
        private byte[] getFileFromAzureFileService(int ModuleID,string filename,bool operDelFile)
        {

            var docconfigdet = GetDocumentShareDetails(ModuleID);
            string[] directorydet = docconfigdet.ChildDirectory.Split('/');
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            CloudFileClient fileClient = storageAccount.CreateCloudFileClient();
            CloudFileShare share = fileClient.GetShareReference(docconfigdet.RootDirectory.ToString());
            if (share.Exists())
            {
                CloudFileDirectory[] filedirectory = new CloudFileDirectory[directorydet.Length];
                var i = 0;
                CloudFileDirectory rootdir = share.GetRootDirectoryReference();

                foreach (var dir in directorydet)
                {
                    if (i == 0)
                    {
                        filedirectory[i] = rootdir.GetDirectoryReference(dir);

                    }
                    else
                    {
                        filedirectory[i] = filedirectory[i - 1].GetDirectoryReference(dir);
                    }
                   

                    if (!filedirectory[i].Exists())
                    {
                        throw new ArgumentOutOfRangeException("File Share Does not Exists");
                    }
                    i++;
                }

                i--;
                try
                {
                   
                    CloudFile downloadfile = filedirectory[i].GetFileReference(filename);
                    if (operDelFile)
                    {
                        downloadfile.Delete();
                        return null;

                    }

                    if (downloadfile.Exists())
                    {
                        if (downloadfile.Properties.Length <= 0) throw new ArgumentOutOfRangeException("File Does not Exists...");
                        byte[] filebytes = new byte[downloadfile.Properties.Length];
                        downloadfile.DownloadToByteArray(filebytes, 0);
                        return filebytes;
                    }
                    else
                    {
                        throw new Exception("File Not Found...");
                    }
                }
                catch (Exception ex)
                {

                    throw new Exception(ex.ToString());
                }
            }
            else
            {
                throw new ArgumentOutOfRangeException("File Share Does not Exists");
            }

           
        }

        /// <summary>
        /// To Get the Information aboug the File Share configuration for storing the document
        /// </summary>
        /// <param name="Moduleid"></param>
        /// <returns></returns>
        private DocumenControlMaster GetDocumentShareDetails(int Moduleid)
        {
            if (Moduleid <= 0) throw new ArgumentOutOfRangeException("Module ID cannot be zero or negative");
            var docDet = db.DocumenControlMasters.Find(Moduleid);
            if (docDet == null)

                throw new Exception("No matching Configuration found for the given ModuleID");

            else
                return docDet;
        }

    }

    
}
