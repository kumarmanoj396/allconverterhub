package com.allconverterhub.api.account;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public final class AccountDtos {
  private AccountDtos() { }

  public record ProfileResponse(String email, String firstName, String lastName, boolean emailVerified, Instant createdAt) { }
  public record UpdateProfileRequest(@NotBlank @Size(max = 60) String firstName, @NotBlank @Size(max = 60) String lastName) { }
  public record ChangePasswordRequest(@NotBlank String currentPassword, @NotBlank @Size(min = 12, max = 128) String newPassword) { }
  public record ToolPreferenceResponse(String toolId) { }
  public record ConversionHistoryRequest(@NotBlank @Size(max = 100) String toolId, @NotBlank @Size(max = 32) String action) { }
  public record ConversionHistoryResponse(String toolId, String action, Instant occurredAt) { }
  public record MessageResponse(String message) { }
}
