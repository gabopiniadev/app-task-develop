package org.development.taskback.Controller;

import jakarta.persistence.EntityNotFoundException;
import org.development.taskback.Model.Cout;
import org.development.taskback.Model.TaskModel;
import org.development.taskback.Service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }



    /**
     * Retrieves all tasks from the task service.
     *
     * @return A list of TaskModel objects representing the tasks.
     */
    @GetMapping(value = "/task")
    public List<TaskModel> getAllTask() {
        return this.taskService.getTaskAll();
    }



    /**
     * Retrieves the percentage of each task type from the task service.
     *
     * @return A list of Cout objects representing the percentage of each task type.
     */
    @GetMapping(value = "/task/data")
    public List<Cout> getPorcentageFromType() {
        return this.taskService.getPorcentageFromType();
    }


    /**
     * Retrieves a task by its ID.
     *
     * @param id The ID of the task.
     * @return The TaskModel object representing the task.
     * @throws EntityNotFoundException If the task with the given ID does not exist.
     */
    @GetMapping(value = "/task/{id}")
    public TaskModel getTaskById(@PathVariable Long id) {
        return this.taskService.getTaskById(id).orElseThrow(() -> new EntityNotFoundException("Task No Found"));
    }



    /**
     * Sends a task model to be saved.
     *
     * @param taskModel The task model to be saved.
     * @return The saved task model.
     */
    @PostMapping(value = "/task")
    public TaskModel sendTask(@RequestBody TaskModel taskModel) {
        return this.taskService.saveTask(taskModel);
    }



    /**
     * Updates a task with the given task model and id.
     *
     * @param taskModel The updated task model.
     * @param id        The id of the task to update.
     * @return A ResponseEntity containing the updated task model if it exists, or null if it does not exist.
     */
    @PutMapping(value = "/task/{id}")
    public ResponseEntity<TaskModel> updateTask(@RequestBody TaskModel taskModel, @PathVariable Long id) {
        return ResponseEntity.of(taskService.updateTask(taskModel, id));
    }

    /**
     * Deletes a task by its ID.
     *
     * @param id The ID of the task to delete.
     * @return A ResponseEntity with a status code indicating the result of the deletion.
     */
    @DeleteMapping(value ="/task/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        this.taskService.deleteTaskById(id);

        return ResponseEntity.status(HttpStatus.OK).body("Task Delete Sucessfully");
    }
}
