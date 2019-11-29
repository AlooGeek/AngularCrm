import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apuUrl='/api/crm-web/rest/Document/getAll';


  constructor(private _http : HttpClient) { }

getDocument(){
  return this._http.get<Document[]>(this.apuUrl);
}
delUrl='/api/crm-web/rest/Document/delete';

deleteDocument (id : number): Observable<Document> {
  let params = new HttpParams();
 //  id = typeof doc === 'number' ? doc : doc;
  const url=this.delUrl+'?id='+id;
  return this._http.delete<Document>(url);
  }
  addUrl='/api/crm-web/rest/Document/add';

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  addDocument (): Observable<Document> {
    return this._http.post<Document>(this.addUrl,
    this.httpOptions);
    }
}