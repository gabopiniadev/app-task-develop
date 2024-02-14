import {Status} from "./status";

export interface Task {
  id: string,
  titleTask: string,
  typeTask: Status,
  dateTask: Date,
  descriptionTask: string
}
