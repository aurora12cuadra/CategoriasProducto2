# Primera etapa: Construcción de la aplicación con Maven
FROM maven:3.8.1-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Segunda etapa: Ejecución de la aplicación en Eclipse Temurin JRE
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT java -jar app.jar