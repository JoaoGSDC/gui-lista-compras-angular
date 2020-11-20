import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface List {
  id: number;
  item: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListItemsService {

  constructor(private http: HttpClient) { }

  url: string = `${environment.url}/items`;

  getItems(): Observable<List[]> {
    return this.http.get<List[]>(`${environment.url}/teste`);
  }

  insertItem(item: List): Observable<List[]> {
    return this.http.post<List[]>(this.url, item).pipe(take(1));
  }

  updateItem(item: List): Observable<List[]> {
    return this.http.put<List[]>(this.url, item).pipe(take(1));
  }

  deleteItem(item: List): Observable<any> {
    return this.http.delete<any>(this.url, { headers: { id: String(item.id) } }).pipe(take(1), delay(50));
  }
}
