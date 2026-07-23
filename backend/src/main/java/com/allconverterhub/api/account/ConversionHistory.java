package com.allconverterhub.api.account;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("conversion_history")
public class ConversionHistory {
  @Id private String id;
  private String userId;
  private String toolId;
  private String action;
  private Instant occurredAt;

  public ConversionHistory() { }
  public ConversionHistory(String userId, String toolId, String action) { this.userId = userId; this.toolId = toolId; this.action = action; this.occurredAt = Instant.now(); }
  public String getToolId() { return toolId; }
  public String getAction() { return action; }
  public Instant getOccurredAt() { return occurredAt; }
}
