import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {MatList, MatListItem, MatListOption, MatSelectionList} from "@angular/material/list";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {Observable} from "rxjs";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TaskService} from "../../../services/task.service";
import {Task} from "../../../shared/interfaces/task";
import {DialogComponent} from "../../../shared/dialog/dialog.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatSelectionList,
    MatListOption,
    MatButtonModule,
    AsyncPipe,
    DatePipe,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  @Output() refreshEmitter = new EventEmitter<boolean>();

  tasks: Observable<Array<Task>> | undefined;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.tasks = this.taskService.getAllTask();
  }

  onOpenDialog(task: Task) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: task,
      width: '520px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasks();
      this.refreshEmitter.emit(true);
    });
  }
}
