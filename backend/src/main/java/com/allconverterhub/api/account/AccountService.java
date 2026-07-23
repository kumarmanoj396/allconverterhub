package com.allconverterhub.api.account;

import com.allconverterhub.api.account.AccountDtos.ChangePasswordRequest;
import com.allconverterhub.api.account.AccountDtos.ConversionHistoryRequest;
import com.allconverterhub.api.account.AccountDtos.ConversionHistoryResponse;
import com.allconverterhub.api.account.AccountDtos.ProfileResponse;
import com.allconverterhub.api.account.AccountDtos.ToolPreferenceResponse;
import com.allconverterhub.api.account.AccountDtos.UpdateProfileRequest;
import com.allconverterhub.api.auth.AuthService;
import com.allconverterhub.api.auth.AuthTokenRepository;
import com.allconverterhub.api.user.User;
import com.allconverterhub.api.user.UserRepository;
import java.util.List;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
  private final UserRepository users;
  private final UserFavoriteRepository favorites;
  private final ConversionHistoryRepository history;
  private final PasswordEncoder passwordEncoder;
  private final AuthService authService;
  private final AuthTokenRepository tokens;

  public AccountService(UserRepository users, UserFavoriteRepository favorites, ConversionHistoryRepository history, PasswordEncoder passwordEncoder, AuthService authService, AuthTokenRepository tokens) {
    this.users = users;
    this.favorites = favorites;
    this.history = history;
    this.passwordEncoder = passwordEncoder;
    this.authService = authService;
    this.tokens = tokens;
  }

  public ProfileResponse profile(String userId) { return toProfile(user(userId)); }
  public ProfileResponse updateProfile(String userId, UpdateProfileRequest request) { User user = user(userId); user.updateProfile(normalizeName(request.firstName()), normalizeName(request.lastName())); return toProfile(users.save(user)); }
  public void changePassword(String userId, ChangePasswordRequest request) { User user = user(userId); if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) throw new BadCredentialsException("Current password is incorrect."); user.setPasswordHash(passwordEncoder.encode(request.newPassword())); users.save(user); tokens.deleteByUserId(userId); }
  public void resendVerification(String userId) { authService.resendVerification(user(userId).getEmail()); }
  public List<ToolPreferenceResponse> favorites(String userId) { return favorites.findByUserIdOrderByCreatedAtDesc(userId).stream().map(favorite -> new ToolPreferenceResponse(favorite.getToolId())).toList(); }
  public void saveFavorite(String userId, String toolId) { if (!favorites.existsByUserIdAndToolId(userId, toolId)) favorites.save(new UserFavorite(userId, toolId)); }
  public void removeFavorite(String userId, String toolId) { favorites.deleteByUserIdAndToolId(userId, toolId); }
  public List<ConversionHistoryResponse> history(String userId) { return history.findTop20ByUserIdOrderByOccurredAtDesc(userId).stream().map(item -> new ConversionHistoryResponse(item.getToolId(), item.getAction(), item.getOccurredAt())).toList(); }
  public void recordHistory(String userId, ConversionHistoryRequest request) { history.save(new ConversionHistory(userId, request.toolId(), request.action())); }

  private User user(String userId) { return users.findById(userId).orElseThrow(() -> new IllegalArgumentException("Account not found.")); }
  private ProfileResponse toProfile(User user) { return new ProfileResponse(user.getEmail(), displayNamePart(user.getFirstName()), displayNamePart(user.getLastName()), user.isEmailVerified(), user.getCreatedAt()); }
  private String normalizeName(String name) { return name.trim().replaceAll("\\s+", " "); }
  private String displayNamePart(String name) { return name == null ? "" : name; }
}
