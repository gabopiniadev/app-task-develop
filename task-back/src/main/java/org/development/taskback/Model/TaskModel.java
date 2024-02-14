package org.development.taskback.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Task")
public class TaskModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "titleTask")
    private String titleTask;

    @Enumerated(EnumType.STRING)
    @Column(name = "typeTask")
    private TypeTask typeTask;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSSX", timezone="UTC")
    @Column(name = "dateTask")
    private Date dateTask;

    @Column(name = "descriptionTask")
    private String descriptionTask;

}
