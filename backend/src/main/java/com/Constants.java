package com;
/**
 * Constants used throughout the application for various messages and statuses.
 *
 * @author Dhinesh Kannan.M
 */
public class Constants {

    /**
     * Message displayed upon successful login.
     */
    public static final String LOGIN_SUCCESS = "Login successful";

    /**
     * Message for an invalid password.
     */
    public static final String INVALID_PASSWORD = "Invalid password. Please try again.";

    /**
     * Message when the user is not found and needs to register.
     */
    public static final String USER_NOT_FOUND = "User not found. Please register";

    /**
     * Message indicating an existing username during registration.
     */
    public static final String USERNAME_EXISTS = "Username already exists";

    /**
     * Message for successful user registration.
     */
    public static final String USER_REGISTERED = "User Registered Successfully";

    /**
     * Message for successful user account activation.
     */
    public static final String USER_ACTIVATED = "User Account Activated Successfully";

    /**
     * Message for successful user account deactivation.
     */
    public static final String USER_DEACTIVATED = "User Account Deactivated Successfully";

    /**
     * Message when the user account is blocked by an admin.
     */
    public static final String USER_BLOCKED = "User Account Blocked by Admin";

    /**
     * Message for a null login request object.
     */
    public static final String NULL_LOGIN = "Login request cannot be null";

    /**
     * Message for a null register request object.
     */
    public static final String NULL_REGISTER = "Register request cannot be null";

    /**
     * Message indicating a null status.
     */
    public static final String NULL_STATUS = "Status cannot be null";

    /**
     * Message for a null ID request object.
     */
    public static final String NULL_ID_REQUEST = "ID request cannot be null";

    /**
     * Message for a null update status request object.
     */
    public static final String NULL_UPDATE = "Update status request cannot be null";

    public static final String NULL_USERNAME = "Login request contains null username or password";
    public static final  String NULL_USERNAME_REGISTER = "Register request contains null username or password";
}
