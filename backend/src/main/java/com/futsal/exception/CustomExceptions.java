package com.futsal.exception;
/**
 * Custom exception classes for specific scenarios in the application.
 * @author Dhinesh Kannan.M
 */
public class CustomExceptions  {

    /**
     * Custom exception class for unauthorized access scenarios.
     */
    public static class UnauthorizedException extends Exception {
      private  static final long serialVersionUID = 12345678916L;

        public UnauthorizedException(final String message) {
            super(message);
        }
    }
    /**
     * Custom exception class for forbidden access scenarios.
     */
    public static class ForbiddenException extends Exception {
        private  static final long serialVersionUID = 12345678915L;

        public ForbiddenException(final String message) {
            super(message);
        }
    }

    /**
     * Custom exception class for resource not found scenarios.
     */
    public static class ResourceNotFoundException extends Exception {
        private static final long serialVersionUID = 12345678914L;

        public ResourceNotFoundException(final String message) {
            super(message);
        }
    }

    /**
     * Custom exception class for handling null requests.
     */
    public static class RequestNullException extends Exception {
        private  static final long serialVersionUID = 12345678913L;

        public RequestNullException(final String message) {
            super(message);
        }
    }

    /**
     * Custom exception class for user registration failures.
     */
    public static class UserRegistrationException extends Exception {
        private static final long serialVersionUID = 12345678912L;

        public UserRegistrationException(final String message) {
            super(message);
        }
    }
    /**
     * Custom exception class for user registration failures.
     */
    public static class UserAccountNotFoundException extends Exception {
        private static final long serialVersionUID = 12345678911L;

        public UserAccountNotFoundException(final String message) {
            super(message);
        }
    }
    /**
     * Custom exception class for user registration failures.
     */
    public static class UserIdNotFoundException extends Exception {
        private  static final long serialVersionUID = 12345678910L;

        public UserIdNotFoundException(final String message) {
            super(message);
        }
    }
    /**
     * Custom exception class for user status not found .
     */
    public static class ActivationStatusNotFoundException extends Exception {
        private static final long serialVersionUID = 1234567899L;

        public ActivationStatusNotFoundException(String message) {
            super(message);
        }
    }
}
