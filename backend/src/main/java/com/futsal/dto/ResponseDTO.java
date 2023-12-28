package com.futsal.dto;

import lombok.Data;

/**
 * Data Transfer Object (DTO) representing a user-related response.
 */
@Data
public class ResponseDTO {
    /**
     *Status code indicating the outcome of the operation.
     */
    private int status;

    /**
     *  A descriptive message related to the status or outcome.
     */

    private String message;

    /**
     * Details of any error that might have occurred during the operation.
     */
    private String error;

    /**
     * A generic object to hold additional data associated with the response.
     */
    private Object data;

    public ResponseDTO(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ResponseDTO(int status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
