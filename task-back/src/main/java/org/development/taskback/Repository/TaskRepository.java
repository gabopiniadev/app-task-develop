package org.development.taskback.Repository;

import org.development.taskback.Model.Cout;
import org.development.taskback.Model.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {

    @Query(value="select * from task order by date_task desc", nativeQuery = true)
    List<TaskModel> getAllTaskFromDateDesc();

    @Query(value="select * from task order by date_task asc", nativeQuery = true)
    List<TaskModel> getAllTaskFromDateAsc();

    @Query(value="select (count(*)/(select count(*) from task) * 100), ts.type_task from task ts group by ts.type_task", nativeQuery = true)
    List<Object[]> getCountTask();


}
