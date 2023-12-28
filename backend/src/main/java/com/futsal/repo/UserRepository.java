package com.futsal.repo;

import com.futsal.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
/**
 * Repository interface for UserAccount entity.
 *
 * @author Dhinesh Kannan.M
 */
@Repository
public interface UserRepository extends JpaRepository<UserAccount, Long> {

    /**
     * Finds a user by their username.
     *
     * @param username The username of the user to search for.
     * @return The UserAccount object associated with the given username.
     */
    UserAccount findByUsername(String username);

    /**
     * Checks if a user with the given username exists.
     *
     * @param username The username to check for existence.
     * @return true if a user with the given username exists, otherwise false.
     */
    boolean existsByUsername(String username);

    @Query("SELECT u.status FROM UserAccount u WHERE u.userId = :userId")
    Boolean findStatusByUserId(@Param("userId") Long userId);
}
