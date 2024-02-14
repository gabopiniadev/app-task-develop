import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Task} from "../shared/interfaces/task";
import {Status} from "../shared/interfaces/status";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import {TaskTypeOption} from "../shared/interfaces/taskTypeOption";
import {TypePorcentage} from "../shared/interfaces/type-porcentage";

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  private static readonly TASKS_API = 'http://localhost:8080/api/v1/';

  getAllTask() {
    return this.httpClient.get(TaskService.TASKS_API+'task')
      .pipe(map(data => this.transformApiData(data)));
  }

  getTaskById(id: any): Observable<Task> {
    const taskEndpoint = `${TaskService.TASKS_API}task/${id}`;
    return this.httpClient.get(taskEndpoint)
      .pipe(map((apiResponse: any) => this.transformSingleTaskData(apiResponse)));
  }

  saveTask(task: Task): Observable<Task> {
    const taskApiEndpoint = `${TaskService.TASKS_API}task`;
    return this.httpClient.post<Task>(taskApiEndpoint, task).pipe(
      map((savedTask: Task) => savedTask)
    );
  }

  getStatusTask():Array<TaskTypeOption> {
    return [{type: Status.Draft},{type: Status.Pending}, {type: Status.Process}, {type: Status.Success}]
  }

  private transformApiData(data: any): Task[] {
    return data.map((taskData: any) => {
      return {
        id: taskData.id,
        titleTask: taskData.titleTask,
        typeTask: taskData.typeTask,
        dateTask: taskData.dateTask,
        descriptionTask: taskData.descriptionTask,
      };
    });
  }

  private transformSingleTaskData(taskData: any): Task {
    return {
      id: taskData.id,
      titleTask: taskData.titleTask,
      typeTask: taskData.typeTask,
      dateTask: taskData.dateTask,
      descriptionTask: taskData.descriptionTask,
    };
  }

  updateTaskById(id: string, task: Task): Observable<Task> {
    const taskApiEndpoint = `${TaskService.TASKS_API}task/${id}`;
    return this.httpClient.put<Task>(taskApiEndpoint, task);
  }

  deleteTaskById(id: string) {
    const taskApiEndpoint = `${TaskService.TASKS_API}task/${id}`;
    return this.httpClient.delete(taskApiEndpoint)
  }

  getPorcentageTask(): Observable<Array<TypePorcentage>> {
    const taskApiEndpoint = `${TaskService.TASKS_API}task/data`;
    return this.httpClient.get<Array<TypePorcentage>>(taskApiEndpoint);
  }
}
