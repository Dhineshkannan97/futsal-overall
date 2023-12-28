package com.futsal.controller;

import com.Constants;
import com.futsal.dto.ResponseDTO;
import com.futsal.entity.UserAccount;
import com.futsal.exception.CustomExceptions;
import com.futsal.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
/**
 * Controller class handling user-related operations.
 * @author Dhinesh Kannan.M
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    /**
     * The logger instance used for logging within the UserController class.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    /**
     * Service class providing user-related functionality.
     */

    private final UserService userService;
public UserController(UserService userService){
    this.userService=userService;
}
    /**
     * Endpoint to register a new user.
     *
     * @param request The UserAccount object containing registration details.
     * @return A string representation of the registration response.
     * @throws CustomExceptions.RequestNullException       If the request contains null or empty username/password.
     * @throws CustomExceptions.UserRegistrationException  If an error occurs during user registration.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO registerUser(@RequestBody final UserAccount request) throws CustomExceptions.RequestNullException, CustomExceptions.UserRegistrationException {
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("registerUser() started with user: {}", request.getUsername());
        }
        /**
         *   Validate if the username or password is null or empty
         */
        System.out.println(">>>>>....");
        System.out.println(request);
        if (request != null) {
            if (StringUtils.isEmpty(request.getUsername()) || StringUtils.isEmpty(request.getPassword())) {
                LOGGER.error("UserAccount registration request contains null username or password");
                LOGGER.info("registerUser() ended with user: {}", request.getUsername());
                throw new CustomExceptions.RequestNullException(Constants.NULL_USERNAME_REGISTER);
            }
        } else {
            throw new CustomExceptions.RequestNullException(Constants.NULL_REGISTER);
        }
        /**
         *  Attempt to register the user using the UserService
         */
        final ResponseDTO response = userService.registerUser(request.getUsername(), request.getPassword());
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("UserAccount registration response: {}", response);
        }
        LOGGER.info("registerUser() ended with user: {}", request.getUsername());
        System.out.println("respnce");
        System.out.println(response);
        return response;
    }
    /**
     * Endpoint to log in a user with the provided credentials.
     *
     * @param loginRequest The UserAccount object containing login details (username and password).
     * @return A UserDTO object representing the login response.
     * @throws CustomExceptions.RequestNullException      If the login request contains null or empty username/password.
     * @throws CustomExceptions.UnauthorizedException      If the login credentials are invalid.
     * @throws CustomExceptions.ForbiddenException         If the user is forbidden from accessing the resource.
     * @throws CustomExceptions.ResourceNotFoundException If the user account is not found.
     */
    @PostMapping("/login")
    public ResponseDTO loginUser(@RequestBody final UserAccount loginRequest) throws CustomExceptions.RequestNullException, CustomExceptions.UnauthorizedException, CustomExceptions.ForbiddenException, CustomExceptions.ResourceNotFoundException {
        if (LOGGER.isInfoEnabled()) {
            LOGGER.info("loginUser() started with user: {}", loginRequest.getUsername());
        }
        /**
         * Validate if the username or password is null or empty
         */
        if(StringUtils.isEmpty(loginRequest)) {
           if (StringUtils.isEmpty(loginRequest.getUsername())||StringUtils.isEmpty(loginRequest.getPassword())) {
                LOGGER.error("Login request contains null username or password");
                LOGGER.info("loginUser() ended with user: {}", loginRequest.getUsername());
                throw new CustomExceptions.RequestNullException(Constants.NULL_USERNAME);
            }
            LOGGER.error("Login request contains null username or password");
            LOGGER.info("loginUser() ended with user: {}", loginRequest);
            throw new CustomExceptions.RequestNullException(Constants.NULL_LOGIN);
        }
        /**
         * Attempt to log in the user using the UserService
         */
        final ResponseDTO loginResponse = userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword());
        LOGGER.info("Login response: {}", loginResponse);
        LOGGER.info("loginUser() ended with user: {}", loginRequest.getUsername());
        return loginResponse;
    }
}

