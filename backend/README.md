~~# futsalApp

This project is a Futsal Management System API developed using Java Spring Boot. It provides functionalities for userAccount
registration, login, and admin features such as checking and updating userAccount activation status.

## Project Structure

The project structure consists of several packages:

- `com.futsal.controller`: Contains REST endpoints for userAccount and admin functionalities.
- `com.futsal.entity`: Defines the User entity with necessary fields.
- `com.futsal.service`: Includes service classes for userAccount and admin operations.
- `com.futsal.repo`: Contains the UserRepository interface for userAccount-related database operations.

## Requirements

Ensure the following are installed:

- Java JDK 11 or higher
- Maven
- MySQL or any compatible database

## Setup

1. Clone the repository:
   git clone https://git.gcitsolutions.com/pip/dhineshkannan.git
   cd futsal The API will start at http://localhost:8081. 
2. Build the project:
   mvn clean install 
3. Configure Database:
   -Update application.properties with your database configurations. 
4. Run the application:
   -mvn spring-boot:run

## Endpoints

### Admin Endpoints

GET /api/admin/activationStatus?id={userId} - Retrieve userAccount activation status. 
POST
/api/admin/activationStatus?id={userId}&activation={true/false} - Update userAccount activation status.

### User Endpoints 

POST
/api/users/register - Register a new userAccount. 
POST 
/api/users/login - Login with userAccount credentials.~~