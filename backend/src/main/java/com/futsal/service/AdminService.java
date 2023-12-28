package com.futsal.service;

import com.Constants;
import com.futsal.entity.UserAccount;
import com.futsal.exception.CustomExceptions;
import com.futsal.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;
/**
 * Service class handling administrative operations.
 *
 * @author Dhinesh Kannan.M
 */
@Service
public class AdminService {
    /**
     * The logger instance used for logging within the AdminService class.
     */
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);
    /**
     * Repository for managing user account entities.
     */

    private final UserRepository userRepository;
    public AdminService(UserRepository userRepository){
        this.userRepository = userRepository;
    };
    /**
     * Service method to retrieve the activation status of the user identified by the given ID.
     *
     * @param userId The ID of the user for whom activation status is requested.
     * @return The activation status of the user identified by the given ID.
     */
    public boolean getUserActivationStatus(final Long userId) {
        LOGGER.info("getUserActivationStatus() started for  userAccount with ID: {}", userId);
        /**
         * Calls the repository method to retrieve the activation status by user ID.
         */
        return userRepository.findStatusByUserId(userId);
    }
    /**
     * Service method to update the activation status for the user identified by the given ID.
     *
     * @param userId     The ID of the user for whom the activation status needs to be updated.
     * @param activation The new activation status (true for activation, false for deactivation).
     * @return A string representing the action performed (activation/deactivation).
     * @throws CustomExceptions.UserAccountNotFoundException If the user account is not found with the given ID.
     */
    public String updateActivationStatus(final Long userId, final boolean activation) throws CustomExceptions.UserAccountNotFoundException {

        LOGGER.info("userActivationStatus() started for userAccount with ID: {} to {}", userId, activation);

            final Optional<UserAccount> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                final UserAccount userAccount = userOptional.get();
                userAccount.setStatus(activation);
                userAccount.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
                userRepository.save(userAccount);
                final String action = activation ? Constants.USER_ACTIVATED : Constants.USER_DEACTIVATED;
                LOGGER.info("UserAccount activation status changed successfully for userAccount with ID: {}", userId);
                LOGGER.info("userActivationStatus() ended for  userAccount with ID: {} to {}", userId, activation);
                return action;
            } else {
                final String errorMessage = "UserAccount not found with ID: " + userId;
                LOGGER.error(errorMessage);
                LOGGER.info("userActivationStatus() ended for  userAccount with ID: {} to {}", userId, activation);
                throw new CustomExceptions.UserAccountNotFoundException(errorMessage);
            }

        }
    }

