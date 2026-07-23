package com.allconverterhub.api.account;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user_favorites")
@CompoundIndex(name = "user_tool_unique", def = "{'userId': 1, 'toolId': 1}", unique = true)
public class UserFavorite {
  @Id private String id;
  private String userId;
  private String toolId;
  private Instant createdAt;

  public UserFavorite() { }
  public UserFavorite(String userId, String toolId) { this.userId = userId; this.toolId = toolId; this.createdAt = Instant.now(); }
  public String getToolId() { return toolId; }
  public Instant getCreatedAt() { return createdAt; }
}
