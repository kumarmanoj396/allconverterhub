package com.allconverterhub.api.auth;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("auth_tokens")
public class AuthToken {
  @Id private String id;
  @Indexed private String userId;
  @Indexed(unique = true) private String tokenHash;
  private TokenPurpose purpose;
  private Instant expiresAt;
  private Instant createdAt = Instant.now();
  public AuthToken() { }
  public AuthToken(String userId, String tokenHash, TokenPurpose purpose, Instant expiresAt) { this.userId = userId; this.tokenHash = tokenHash; this.purpose = purpose; this.expiresAt = expiresAt; }
  public String getUserId() { return userId; }
  public TokenPurpose getPurpose() { return purpose; }
  public Instant getExpiresAt() { return expiresAt; }
}
