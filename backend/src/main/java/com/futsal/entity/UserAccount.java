package com.futsal.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

/**
 * Entity class representing user account information.
 *
 * @author Dhinesh Kannan.M
 */
@Entity
@Data
@NoArgsConstructor
public class UserAccount {
    /**
     * The id associated with the user account.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    /**
     * The username associated with the user account.
     */
    @NotNull
    private String username;

    /**
     * The password associated with the user account.
     */
    @NotNull
    private String password;

    /**
     * The status indicating the user account's active or inactive state.
     */
    @NotNull
    private Boolean status;

    /**
     * The timestamp representing the creation time of the user account.
     */
    @NotNull
    private Timestamp createdAt;

    /**
     * The timestamp representing the last update time of the user account.
     */
    @NotNull
    private Timestamp updatedAt;

    /**
     * Parameterized constructor for the UserAccount class.
     *
     * @param username The username to set for the user account.
     * @param password The password to set for the user account.
     */
    public UserAccount(final String username, final String password) {
        // Add specific initialization logic if needed for the constructor.
        this.username = username;
        this.password = password;
    }
}
