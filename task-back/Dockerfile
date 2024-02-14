# Use la imagen base oficial de OpenJDK para ejecutar nuestra aplicación
FROM openjdk:17-jdk-alpine

# Información del mantenedor
LABEL maintainer="gabrielpinia@hotmail.com"

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Agregar el jar del proyecto al contenedor
ADD target/task-back.jar task-back.jar

# Indicar que la aplicación se ejecutará en el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "task-back.jar"]