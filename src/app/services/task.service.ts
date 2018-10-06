import { Injectable } from '@angular/core';
import {Task} from '../models/task';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'https://whispering-hollows-26336.herokuapp.com/api/v1/tasks/';

  constructor(private http: HttpClient) { }

  create(task: Task) {
    return this.http.post(this.url, task);
  }

  getAll() {
    return this.http.get(this.url);
  }

  get(taskId): Observable<any> {
    return this.http.get(this.url + taskId);
  }

  update(task: Task) {
    return this.http.put(this.url + task.id, task);
  }

  delete(taskId) {
    return this.http.delete(this.url + taskId);
  }

}
