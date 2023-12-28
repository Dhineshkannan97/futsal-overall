package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
/**
 * This class represents the main application for the Futsal App Microservice.
 * It uses Spring Boot's @SpringBootApplication to initialize the application.
 *
 * @author Dhinesh Kannan.M
 */
@SpringBootApplication
public class FutsalAppMicroserviceApplication {
    /**
     * The main method that initializes and starts the Spring Boot application.
     *
     * @param args Command-line arguments passed to the application.
     */
    public static void main(final String[] args) {
        SpringApplication.run(FutsalAppMicroserviceApplication.class, args);
    }
}
