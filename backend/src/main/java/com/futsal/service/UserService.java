package com.futsal.service;

import com.Constants;
import com.futsal.dto.ResponseDTO;
import com.futsal.entity.UserAccount;
import com.futsal.exception.CustomExceptions;
import com.futsal.repo.UserRepository;
import com.futsal.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Service class handling user-related operations.
 *
 * @author Dhinesh Kannan.M
 */
@Service
public class UserService {
    /**
     * The logger instance used for logging within the AdminService class.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    /**
     * Repository for managing user account entities.
     */
    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param username The username for which used to find the user by name .
     * @return The UserAccount object associated with the given username.
     */
    public UserAccount getUserByUsername(final String username) {
        LOGGER.info("Fetching user by username: {}", username);
        return userRepository.findByUsername(username);
    }

    /**
     * Validates the provided password for the given username.
     *
     * @param username The username for which the password is to be validated.
     * @param password The password to be validated.
     * @return A boolean indicating whether the provided password matches the user's stored password.
     */

    /**
     * Logs in a user with the provided username and password.
     *
     * @param username The username of the user to log in.
     * @param password The password for the user's login.
     * @return A UserDTO object representing the login response.
     * @throws CustomExceptions.UnauthorizedException     If the login credentials are invalid.
     * @throws CustomExceptions.ForbiddenException        If the user is forbidden from logging in (e.g., user blocked).
     * @throws CustomExceptions.ResourceNotFoundException If the user account is not found.
     */
    public ResponseDTO loginUser(final String username, final String password) throws CustomExceptions.UnauthorizedException, CustomExceptions.ForbiddenException, CustomExceptions.ResourceNotFoundException {
        LOGGER.info("loginUser()service method started with user: {}", username);
        /**
         * Retrieve the user account based on the provided username
         */
        final UserAccount userAccount = getUserByUsername(username);
        if (userAccount != null) {
            /**
             *  Check if the user account status is active
             */
            if (userAccount.getStatus()) {
                if (PasswordUtil.matchPassword(password,userAccount.getPassword())) {
                    LOGGER.info("UserAccount {} logged in successfully", username);
                    LOGGER.info("loginUser()service method ended with user: {}", username);
                    return new ResponseDTO(HttpStatus.OK.value(), Constants.LOGIN_SUCCESS, userAccount);
                } else {
                    LOGGER.error("Invalid password provided for userAccount: {}", username);
                    LOGGER.info("loginUser()service method ended with user: {}", username);
                    throw new CustomExceptions.UnauthorizedException(Constants.INVALID_PASSWORD);
                }
            } else {
                LOGGER.error("UserAccount {} is blocked", username);
                LOGGER.info("loginUser()service method ended with user: {}", username);
                throw new CustomExceptions.ForbiddenException(Constants.USER_BLOCKED);
            }
        } else {
            LOGGER.error("UserAccount {} not found", username);
            LOGGER.info("loginUser()service method ended with user: {}", username);
            throw new CustomExceptions.ResourceNotFoundException(Constants.USER_NOT_FOUND);
        }
    }

    /**
     * Registers a new user with the given username and password.
     *
     * @param username The username for the new user.
     * @param password The password for the new user.
     * @return A string indicating the registration success or failure.
     * @throws CustomExceptions.UserRegistrationException If there's an issue during user registration (e.g., username already exists).
     */
    public ResponseDTO registerUser(final String username, final String password) throws CustomExceptions.UserRegistrationException {
        LOGGER.info("registerUser() service method started with user: {} & {}", username,password);
        /**
         *  Check if the username already exists
         */
        if (userRepository.existsByUsername(username)) {
            LOGGER.info("registerUser() service method ended with user: {} & {}", username,password);
            throw new CustomExceptions.UserRegistrationException(Constants.USERNAME_EXISTS);
        }
        /**
         * Create a new UserAccount object with the provided username and password
         */
        final UserAccount userAccount = new UserAccount(username, password);
        userAccount.setStatus(true);
        userAccount.setUsername(username);
        /**
         * call the method in the util to encode the password
         */
        userAccount.setPassword(PasswordUtil.encodePassword(password));
        /**
         * Set timestamps for creation and update
         */
        userAccount.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        userAccount.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        /**
         * Save the new user account
         */
        userRepository.save(userAccount);
        LOGGER.info("UserAccount {} registered successfully", username);
        LOGGER.info("registerUser() service method ended with user: {} & {}", username,password);
        /**
         * call the  responseDTO constructor
         */
        return new ResponseDTO(HttpStatus.CREATED.value(), Constants.USER_REGISTERED);

//        return Constants.USER_REGISTERED;
    }

}




