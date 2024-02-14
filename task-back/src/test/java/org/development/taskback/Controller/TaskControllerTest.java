package org.development.taskback.Controller;

import jakarta.persistence.EntityNotFoundException;
import org.development.taskback.Model.TaskModel;
import org.development.taskback.Service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(TaskController.class)
@AutoConfigureMockMvc
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

   /* @Test
    void shouldDeleteTaskSuccessfully() throws Exception {
        doNothing().when(taskService).deleteTaskById(1L);
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/task/1"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().string("Task Delete Sucessfully"));

        verify(taskService).deleteTaskById(1L);
    }

    @Test
    void shouldReturnEntityNotFoundWhenDeleteTaskWithNonexistentId() throws Exception {
        doThrow(new EntityNotFoundException("Task Not Found"))
                .when(taskService).deleteTaskById(999L);

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/task/999"))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isInternalServerError());

        verify(taskService).deleteTaskById(999L);
    }*/
}