package org.development.taskback.Service;

import lombok.AllArgsConstructor;
import org.development.taskback.Model.Cout;
import org.development.taskback.Model.TaskModel;
import org.development.taskback.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskService {

    private TaskRepository taskRepository;

    public List<TaskModel> getTaskAll() {
        return this.taskRepository.findAll();
    }


    public Optional<TaskModel> getTaskById(Long id) {
        Optional<TaskModel> task = this.taskRepository.findById(id).stream().findFirst();

        return task;
    }


    public TaskModel saveTask(TaskModel taskModel) {
        return this.taskRepository.save(taskModel);
    }


    public Optional<TaskModel> updateTask(TaskModel newTask, Long id) {
        return getTaskById(id).map(task -> {
            task.setTitleTask(newTask.getTitleTask());
            task.setDescriptionTask(newTask.getDescriptionTask());
            task.setTypeTask(newTask.getTypeTask());
            task.setDateTask(newTask.getDateTask());
            return taskRepository.save(task);
        });
    }

    public void deleteTaskById(Long id) {
        this.taskRepository.deleteById(id);
    }

    public List<Cout> getPorcentageFromType() {
        return taskRepository.getCountTask().stream()
                .map(result -> new Cout((BigDecimal)result[0], (String)result[1]))
                .collect(Collectors.toList());
    }
}
