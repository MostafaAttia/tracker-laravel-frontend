import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit, OnDestroy {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    duration: 0,
    created_at: 0,
    updated_at: 0
  };

  newTask;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  onCreate() {
    this.taskService.create(this.task).pipe(takeUntil(this.unsubscribe)).subscribe(task => {
      this.newTask = task;
      this.router.navigate(['/task', this.newTask.id ]);
    });

  }

  ngOnInit() {
    this.task.duration = this.route.snapshot.queryParamMap.has('totalDuration')
      ?  Number(this.route.snapshot.queryParamMap.get('totalDuration'))
      : 0;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
