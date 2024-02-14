import { Component, OnInit} from '@angular/core';
import {Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, Color} from "chart.js";
import {NgChartsModule} from 'ng2-charts';
import defaultCallbacks from "chart.js/dist/plugins/plugin.tooltip";
import {ListComponent} from "../task/list/list.component";
import {TaskService} from "../../services/task.service";
import {Status} from "../../shared/interfaces/status";
import {TypePorcentage} from "../../shared/interfaces/type-porcentage";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgChartsModule,
    ListComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
    },
    cutout: 80,
  };

  public doughnutChartLabels: Status[] = [];
  doughnutChartData: ChartData < 'doughnut' > = {
    labels: this.doughnutChartLabels,
    datasets: [{
      data: [],
      backgroundColor: ['#f68059', '#ffbf3a', '#4e3dc8', '#2d7e02'],
      rotation: 90,
    }, ],
  };
  public typeData: Array<TypePorcentage> = [];

  constructor(
    private taskService: TaskService
  ) {}

  ngOnInit(): void {

    this.getTaskPercentages();
  }


  getTaskPercentages(): void {
    this.taskService.getPorcentageTask().subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    );
  }

  private handleData(data: TypePorcentage[]): void {
    this.doughnutChartLabels = [];
    this.doughnutChartData.datasets[0].data = [];
    this.typeData = data;
    data.forEach((typeTask:TypePorcentage) => {
      this.doughnutChartData.datasets[0].data.push(typeTask.count);
      if (Object.values(Status).includes(typeTask.typeTask as Status)) {
        this.doughnutChartLabels.push(typeTask.typeTask as Status);
      }
    });
  }

  private handleError(error: any): void {
    console.error("An error occurred: ", error);
  }

  refreshEmitter() {
    this.getTaskPercentages();
  }

}
