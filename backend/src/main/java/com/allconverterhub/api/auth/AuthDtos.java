package com.allconverterhub.api.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {
  private AuthDtos() {
  }

  public record RegisterRequest(@Email @NotBlank String email, @NotBlank @Size(min = 12, max = 128) String password) {
  }

  public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {
  }

  public record RefreshRequest(@NotBlank String refreshToken) {
  }

  public record ForgotPasswordRequest(@Email @NotBlank String email) {
  }

  public record ResetPasswordRequest(@NotBlank String token, @NotBlank @Size(min = 12, max = 128) String password) {
  }

  public record AuthResponse(String accessToken, String refreshToken, String tokenType, long expiresInSeconds) {
  }

  public record MessageResponse(String message) {
  }
}
