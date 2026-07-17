package com.allconverterhub.api.user;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
  @Id
  private String id;
  @Indexed(unique = true)
  private String email;
  private String passwordHash;
  private boolean emailVerified;
  private Instant createdAt;

  public User() {
  }

  public User(String email, String passwordHash) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = Instant.now();
  }

  public String getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public boolean isEmailVerified() {
    return emailVerified;
  }

  public void verifyEmail() {
    this.emailVerified = true;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }
}
