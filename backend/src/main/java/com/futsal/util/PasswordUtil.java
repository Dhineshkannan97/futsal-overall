package com.futsal.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
/**
 * Utility class for password-related operations using BCryptPasswordEncoder.
 * Provides methods to encode a password and match a raw password with an encoded password.
 */
public class PasswordUtil {

    /**
     * Encodes the provided password using BCryptPasswordEncoder.
     *
     * @param password The raw password to be encoded.
     * @return The encoded password string.
     */
    public static String encodePassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    /**
     * Matches a raw password with an encoded password using BCryptPasswordEncoder.
     *
     * @param rawPassword     The raw password to be checked.
     * @param encodedPassword The encoded password to compare against.
     * @return True if the raw password matches the encoded password, false otherwise.
     */
    public static boolean matchPassword(String rawPassword, String encodedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}

