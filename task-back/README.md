# task-back Application

## Descripción

Esta es una aplicación backend desarrollada con Spring Boot. Se utiliza para gestionar tareas.

## Versiones

- Java: 17
- Spring Boot: 3.2.2

## Dependencias principales

- Spring Boot Starter Data JPA
- Spring Boot Starter Web
- MySQL Connector Java
- Project Lombok

## Instalación y Uso

1- Clonar el repositorio

Ejecuta el siguiente comando en tu terminal para clonar el repositorio:

- git clone https://github.com/gabopiniadev/app-task-develop.git

2- Configurar la base de datos Configura tu base de datos MySQL de acuerdo con las propiedades especificadas en el archivo application.properties.

- create table task
  (
  date_task        datetime(6)  null,
  id               bigint auto_increment
  primary key,
  description_task varchar(255) null,
  title_task       varchar(255) null,
  type_task        varchar(255) null
  );

3- Ejecutar la aplicación Navega hasta el directorio raíz del proyecto y ejecuta el siguiente comando para iniciar la aplicación:

- ./mvnw spring-boot:run


## Endpoints

- GetAllTasks

### URL: /api/v1/task
#### Method: GET
#### Description: Obtiene todas las tareas del servicio de tareas.
#### Response: Una lista de objetos TaskModel que representan las tareas.


- GetPorcentageFromType
### URL: /api/v1/task/data
#### Method: GET
#### Description: Obtiene el porcentaje de cada tipo de tarea del servicio de tareas.
#### Response: Una lista de objetos Cout que representan el porcentaje de cada tipo de tarea.


- GetTaskById
### URL: /api/v1/task/{id}
#### Method: GET
#### Description: Obtiene una tarea por su ID.
#### Response: El objeto TaskModel que representa la tarea.
#### Possible errors: Si la tarea con el ID dado no existe, se lanza un EntityNotFoundException.


- SendTask
### URL: /api/v1/task
#### Method: POST
#### Description: Envia un modelo de tarea para ser guardado.
#### Payload: Un objeto TaskModel en formato JSON.
#### Response: Retorna el mismo objeto TaskModel, ahora con su ID asignado.


- UpdateTask
### URL: /api/v1/task/{id}
#### Method: PUT
#### Description: Actualiza una tarea con el modelo de tarea proporcionado y el ID.
#### Payload: Un objeto TaskModel en formato JSON.
#### Response: Un objeto ResponseEntity que contiene el modelo de tarea actualizado si existe, o null si no existe.


- DeleteTask
### URL: /api/v1/task/{id}
#### Method: DELETE
#### Description: Elimina una tarea por su ID.
#### Response: Un objeto ResponseEntity con un mensaje indicando si la tarea fue eliminada con éxito.



## Autores

- Desarrollador: Gabriel Alejandro Pina
- Telefono: +58 412 4931541
- Email: gabrielpinia@hotmail.com
- Website: https://www.gabodevelop.net

## Agradecimientos

Agradecimiento a

- Angular Material por los recursos
- ngChart por por recursos graficos
- Internet por aclaraciones y cambios en nuevas version de Angular

 