package com.futsal.exception;

import com.futsal.dto.ResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
/**
 * Global exception handler to handle specific exception types globally.
 *
 * @author Dhinesh Kannan.M
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles UnauthorizedException globally.
     *
     * @param exception The UnauthorizedException instance caught.
     * @return ResponseEntity with HTTP status code 401 and exception message.
     */
    @ExceptionHandler(CustomExceptions.UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<ResponseDTO> handleUnauthorizedException(final CustomExceptions.UnauthorizedException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseDTO);
    }

    /**
     * Handles ForbiddenException globally.
     *
     * @param exception The ForbiddenException instance caught.
     * @return ResponseEntity with HTTP status code 403 and exception message.
     */
    @ExceptionHandler(CustomExceptions.ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ResponseEntity<ResponseDTO> handleForbiddenException(final CustomExceptions.ForbiddenException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.FORBIDDEN.value(),
                exception.getMessage()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseDTO);
    }

    /**
     * Handles ResourceNotFoundException globally.
     *
     * @param exception The ResourceNotFoundException instance caught.
     * @return ResponseEntity with HTTP status code 404 and exception message.
     */
    @ExceptionHandler(CustomExceptions.ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ResponseDTO> handleResourceNotFoundException(final CustomExceptions.ResourceNotFoundException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDTO);
    }

    /**
     * Handles RequestNullException globally.
     *
     * @param exception The RequestNullException instance caught.
     * @return ResponseEntity with HTTP status code 500 and exception message.
     */
    @ExceptionHandler(CustomExceptions.RequestNullException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ResponseDTO>  handleRequestNullException(final CustomExceptions.RequestNullException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseDTO);
    }

    /**
     * Handles UserRegistrationException globally.
     *
     * @param exception The UserRegistrationException instance caught.
     * @return ResponseEntity with HTTP status code 409 and exception message.
     */
    @ExceptionHandler(CustomExceptions.UserRegistrationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ResponseDTO> handleUserRegistrationException(final CustomExceptions.UserRegistrationException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.CONFLICT.value(),
                exception.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDTO);
    }
    /**
     * Handles UserRegistrationException globally.
     *
     * @param exception The ActivationStatusNotFoundException instance caught.
     * @return ResponseEntity with HTTP status code 404 and exception message.
     */
    @ExceptionHandler(CustomExceptions.ActivationStatusNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ResponseDTO> handleActivationStatusNotFoundException(final CustomExceptions.ActivationStatusNotFoundException exception) {
        ResponseDTO responseDTO = new ResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseDTO);
    }
}
