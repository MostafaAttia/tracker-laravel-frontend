import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../../models/task';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    duration: 0,
    created_at: 0,
    updated_at: 0
  };
  id: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.taskService.get(this.id).pipe(takeUntil(this.unsubscribe)).subscribe(task => this.task = task);
    }
  }

  onDelete() {
    if(! confirm('Are you sure you want to delete this task?')) return;
    this.taskService.delete(this.id).pipe(takeUntil(this.unsubscribe)).subscribe(task => {
      this.router.navigate(['/tasks']);
    });

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
