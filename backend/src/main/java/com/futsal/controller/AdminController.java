package com.futsal.controller;

import com.futsal.exception.CustomExceptions;
import com.futsal.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

import static com.Constants.*;
/**
 *
 * Controller class handling Admin-related operations.
 * @author Dhinesh kannan.M
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    /**
     * The logger instance used for logging within the AdminController class.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);
    /**
     * Service class providing admin-related functionality.
     */
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
    /**
     * Retrieves the activation status of a user based on the provided user ID.
     *
     * @param userId   The ID of the user for whom activation status is requested.
     * @param response HttpServletResponse object to set status and handle the response.
     * @return Boolean status indicating the activation status of the user.
     */
    @GetMapping ("/activationStatus")
    public boolean userActivationStatus(@RequestParam("id") final Long userId, final HttpServletResponse response) throws CustomExceptions.ActivationStatusNotFoundException, CustomExceptions.UserIdNotFoundException {
        LOGGER.info("userActivationStatus() started with ID: {}", userId);
          /**
           *   Retrieve the activation status for the provided user ID
           */
          if (userId!=null) {
              final boolean status = adminService.getUserActivationStatus(userId);
              response.setStatus(HttpStatus.OK.value());
              LOGGER.info("Activation status for user with ID {}: {}", userId, status);
              LOGGER.info("Get activation status ended for user with ID: {}", userId);
              return status;
          }
          else {
               throw new CustomExceptions.UserIdNotFoundException(NULL_ID_REQUEST);
          }
    }
    /**
     * Updates the activation status for a user based on the provided user ID.
     *
     * @param userId     The ID of the user for whom the activation status is to be updated.
     * @param activation The activation status to set for the user.
     * @param response   HttpServletResponse object to set status and handle the response.
     * @return A string representation of the Admin update the status.
     */
    @PostMapping("/activationStatus")
    public String updateUserStatus(
            @RequestParam("id") final Long userId,
            @RequestParam("activation") final boolean activation,
            final HttpServletResponse response) throws CustomExceptions.UserAccountNotFoundException {
        LOGGER.info("updateUserStatus() started with ID: {} to {}", userId, activation);
          /**
           *Check if the user ID is null
           */
        if (userId == null) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            LOGGER.error("ID parameter is null in request");
            LOGGER.info("updateUserStatus() ended with ID: {} to {}", userId, activation);
            return NULL_ID_REQUEST;
        }
        /**
         * If the user ID is not null, proceed with updating activation status
         * Call service to update activation status
         */
        final String updateResponse = adminService.updateActivationStatus(userId, activation);
        response.setStatus(HttpStatus.OK.value());
        LOGGER.info("Update response for user with ID {}: {}", userId, updateResponse);
        LOGGER.info("updateUserStatus() started with ID: {} to {}", userId, activation);
        return updateResponse;
    }
}
