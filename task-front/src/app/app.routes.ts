import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AddComponent} from "./components/task/add/add.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'task',
    children: [
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },
];
