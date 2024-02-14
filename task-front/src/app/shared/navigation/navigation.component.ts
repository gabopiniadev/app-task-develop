import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
