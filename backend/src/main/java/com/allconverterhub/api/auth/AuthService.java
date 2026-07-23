package com.allconverterhub.api.auth;

import com.allconverterhub.api.auth.AuthDtos.AuthResponse;
import com.allconverterhub.api.user.User;
import com.allconverterhub.api.user.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;
import java.util.UUID;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserRepository users; private final AuthTokenRepository tokens; private final PasswordEncoder passwordEncoder; private final JwtService jwtService; private final EmailService emailService;
  public AuthService(UserRepository users, AuthTokenRepository tokens, PasswordEncoder passwordEncoder, JwtService jwtService, EmailService emailService) { this.users = users; this.tokens = tokens; this.passwordEncoder = passwordEncoder; this.jwtService = jwtService; this.emailService = emailService; }
  public void register(String firstName, String lastName, String email, String password) { String normalized = normalize(email); if (users.existsByEmailIgnoreCase(normalized)) throw new IllegalArgumentException("An account with this email already exists."); User user = users.save(new User(normalized, normalizeName(firstName), normalizeName(lastName), passwordEncoder.encode(password))); sendOneTimeToken(user, TokenPurpose.EMAIL_VERIFICATION); }
  public AuthResponse login(String email, String password) { User user = users.findByEmailIgnoreCase(normalize(email)).orElseThrow(() -> new BadCredentialsException("Invalid email or password.")); if (!passwordEncoder.matches(password, user.getPasswordHash())) throw new BadCredentialsException("Invalid email or password."); if (!user.isEmailVerified()) throw new IllegalStateException("Please verify your email before signing in."); return createSession(user); }
  public AuthResponse refresh(String refreshToken) { Claims claims = parseRefreshToken(refreshToken); String tokenHash = hash(claims.getId()); AuthToken token = tokens.findByTokenHashAndPurpose(tokenHash, TokenPurpose.REFRESH).orElseThrow(() -> new BadCredentialsException("Refresh token is invalid or expired.")); if (token.getExpiresAt().isBefore(Instant.now())) { tokens.delete(token); throw new BadCredentialsException("Refresh token is invalid or expired."); } tokens.delete(token); User user = users.findById(token.getUserId()).orElseThrow(() -> new BadCredentialsException("User no longer exists.")); return createSession(user); }
  public void verifyEmail(String rawToken) { AuthToken token = validOneTimeToken(rawToken, TokenPurpose.EMAIL_VERIFICATION); User user = users.findById(token.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found.")); user.verifyEmail(); users.save(user); tokens.delete(token); }
  public void requestPasswordReset(String email) { users.findByEmailIgnoreCase(normalize(email)).ifPresent(user -> sendOneTimeToken(user, TokenPurpose.PASSWORD_RESET)); }
  public void resendVerification(String email) { User user = users.findByEmailIgnoreCase(normalize(email)).orElseThrow(() -> new IllegalArgumentException("Account not found.")); if (!user.isEmailVerified()) sendOneTimeToken(user, TokenPurpose.EMAIL_VERIFICATION); }
  public void resetPassword(String rawToken, String password) { AuthToken token = validOneTimeToken(rawToken, TokenPurpose.PASSWORD_RESET); User user = users.findById(token.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found.")); user.setPasswordHash(passwordEncoder.encode(password)); users.save(user); tokens.deleteByUserIdAndPurpose(user.getId(), TokenPurpose.REFRESH); tokens.delete(token); }
  private AuthResponse createSession(User user) { JwtService.UserPrincipal principal = new JwtService.UserPrincipal(user.getId(), user.getEmail()); String refreshId = UUID.randomUUID().toString(); String refreshToken = jwtService.createRefreshToken(principal, refreshId); tokens.save(new AuthToken(user.getId(), hash(refreshId), TokenPurpose.REFRESH, Instant.now().plusSeconds(jwtService.getRefreshTokenSeconds()))); return new AuthResponse(jwtService.createAccessToken(principal), refreshToken, "Bearer", jwtService.getAccessTokenSeconds()); }
  private void sendOneTimeToken(User user, TokenPurpose purpose) { tokens.deleteByUserIdAndPurpose(user.getId(), purpose); String rawToken = UUID.randomUUID() + "-" + UUID.randomUUID(); tokens.save(new AuthToken(user.getId(), hash(rawToken), purpose, Instant.now().plusSeconds(24 * 3600))); if (purpose == TokenPurpose.EMAIL_VERIFICATION) emailService.sendVerification(user.getEmail(), rawToken); else emailService.sendPasswordReset(user.getEmail(), rawToken); }
  private AuthToken validOneTimeToken(String rawToken, TokenPurpose purpose) { AuthToken token = tokens.findByTokenHashAndPurpose(hash(rawToken), purpose).orElseThrow(() -> new IllegalArgumentException("This link is invalid or has expired.")); if (token.getExpiresAt().isBefore(Instant.now())) { tokens.delete(token); throw new IllegalArgumentException("This link is invalid or has expired."); } return token; }
  private Claims parseRefreshToken(String rawToken) { try { Claims claims = jwtService.parse(rawToken); if (!"refresh".equals(claims.get("type"))) throw new BadCredentialsException("Invalid refresh token."); return claims; } catch (JwtException exception) { throw new BadCredentialsException("Refresh token is invalid or expired."); } }
  private String normalize(String email) { return email.trim().toLowerCase(); }
  private String normalizeName(String name) { return name.trim().replaceAll("\\s+", " "); }
  private String hash(String value) { try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8))); } catch (NoSuchAlgorithmException exception) { throw new IllegalStateException(exception); } }
}
