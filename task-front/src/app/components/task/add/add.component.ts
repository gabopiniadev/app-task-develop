import {Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Status} from "../../../shared/interfaces/status";
import {TaskService} from "../../../services/task.service";
import {TaskTypeOption} from "../../../shared/interfaces/taskTypeOption";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButton,
    ReactiveFormsModule,
    NgForOf,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  taskForms:FormGroup = new FormGroup({});
  typeOption: Array<TaskTypeOption> = [];

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.taskForms = this.fb.group({
      titleTask: ['', Validators.required],
      typeTask: ['', Validators.required],
      dateTask: ['', Validators.required],
      descriptionTask: ['', Validators.required]
    });
    this.typeOption = this.taskService.getStatusTask();
  }


  addTask() {
    console.log(this.taskForms?.value);
    this.isLoading = true;
    if (this.taskForms?.valid) {
      this.taskService.saveTask(this.taskForms.value).subscribe(() => {
        this.openSnackBar('Success Creation', 'Close');
        this.router.navigateByUrl('home');
      }, error => {
        console.log(error);
      })
    } else {
      this.openSnackBar('Form Invalid', 'Close');
    }
  }

  private openSnackBar(message: string, action: string) {
    setTimeout(() => {
      this._snackBar.open(message, action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.isLoading = false;
    }, 2000);
  }

  getTypeOption() {

  }

}
