package com.allconverterhub.api.auth;

import com.allconverterhub.api.auth.AuthDtos.AuthResponse;
import com.allconverterhub.api.auth.AuthDtos.ForgotPasswordRequest;
import com.allconverterhub.api.auth.AuthDtos.LoginRequest;
import com.allconverterhub.api.auth.AuthDtos.MessageResponse;
import com.allconverterhub.api.auth.AuthDtos.RefreshRequest;
import com.allconverterhub.api.auth.AuthDtos.RegisterRequest;
import com.allconverterhub.api.auth.AuthDtos.ResetPasswordRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.ACCEPTED)
 
  public MessageResponse register(@Valid @RequestBody RegisterRequest request) {
    authService.register(request.email(), request.password());
    return new MessageResponse("Registration received. Check your email to verify your account.");
  }

  @PostMapping("/login")
 
  public AuthResponse login(@Valid @RequestBody LoginRequest request) {
    return authService.login(request.email(), request.password());
  }

  @PostMapping("/refresh")
 
  public AuthResponse refresh(@Valid @RequestBody RefreshRequest request) {
    return authService.refresh(request.refreshToken());
  }

  @GetMapping("/verify-email")
 
  public MessageResponse verifyEmail(@RequestParam String token) {
    authService.verifyEmail(token);
    return new MessageResponse("Email verified. You can now sign in.");
  }

  @PostMapping("/forgot-password")
  @ResponseStatus(HttpStatus.ACCEPTED)
 
  public MessageResponse forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
    authService.requestPasswordReset(request.email());
    return new MessageResponse("If an account exists, a password reset email has been sent.");
  }

  @PostMapping("/reset-password")
 
  public MessageResponse resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
    authService.resetPassword(request.token(), request.password());
    return new MessageResponse("Password updated. You can now sign in.");
  }
}
