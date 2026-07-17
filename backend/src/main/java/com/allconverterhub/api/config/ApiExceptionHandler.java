package com.allconverterhub.api.config;

import java.time.Instant;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler({IllegalArgumentException.class, MethodArgumentNotValidException.class}) @ResponseStatus(HttpStatus.BAD_REQUEST) public Map<String, Object> badRequest(Exception exception) { String message = exception instanceof MethodArgumentNotValidException validation ? validation.getBindingResult().getFieldErrors().stream().findFirst().map(error -> error.getField() + " " + error.getDefaultMessage()).orElse("Invalid request.") : exception.getMessage(); return error(message); }
  @ExceptionHandler({BadCredentialsException.class, IllegalStateException.class}) @ResponseStatus(HttpStatus.UNAUTHORIZED) public Map<String, Object> unauthorized(Exception exception) { return error(exception.getMessage()); }
  private Map<String, Object> error(String message) { return Map.of("timestamp", Instant.now().toString(), "message", message); }
}
