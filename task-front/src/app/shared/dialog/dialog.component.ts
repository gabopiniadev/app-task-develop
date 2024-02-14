import {Component, Inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskTypeOption} from "../interfaces/taskTypeOption";
import {TaskService} from "../../services/task.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../interfaces/task";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatProgressSpinner,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  isLoading: boolean = false;

  taskForms: FormGroup = new FormGroup({});
  typeOption: Array<TaskTypeOption> = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private fb: FormBuilder,
    private taskService: TaskService,
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

    this.showTask();
  }

  showTask() {
    this.taskService.getTaskById(this.data.id).subscribe((taskData) => {
      this.setTaskFormValues(taskData);
    }, (error) => {
      this._snackBar.open('Error occurred while fetching task', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }

  setTaskFormValues(taskData: Task) {
    const formControls = this.taskForms.controls;
    formControls['titleTask'].setValue(taskData.titleTask);
    formControls['typeTask'].setValue(taskData.typeTask);
    formControls['dateTask'].setValue(new Date(taskData.dateTask).toISOString());
    formControls['descriptionTask'].setValue(taskData.descriptionTask);
  }

  updateTask() {
    this.isLoading = true;
    if (this.taskForms.valid) {
      this.taskService.updateTaskById(this.data.id, this.taskForms.value)
        .subscribe(this.handleTaskUpdateSuccess, this.handleError);
    } else {
      this.handleFormInvalidity();
    }
  }

  handleFormInvalidity() {
    this.openSnackBar('Form Invalid', 'Close');
  }

  handleTaskUpdateSuccess = () => {
    setTimeout(() => {
      this.openSnackBar('Task updated successfully', 'Close');
      this.dialogRef.close();
    }, 1000);
  }

  handleError = () => {
    this.openSnackBar('Error in Task update', 'Close');
  }

  deleteTaskById() {
    this.taskService.deleteTaskById(this.data.id).subscribe((data) => {
      this._snackBar.open('Task deleted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.dialogRef.close();
    }, (error) => {
      this._snackBar.open('Error occurred while deleting task', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }


  openSnackBar(message:string, action:string) {
    setTimeout(() => {
      this._snackBar.open(message, action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.isLoading = false;
    }, 2000);
  }
}
