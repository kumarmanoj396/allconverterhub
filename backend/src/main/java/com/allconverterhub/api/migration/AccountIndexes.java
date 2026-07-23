package com.allconverterhub.api.migration;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "account-data-indexes", order = "002", author = "allconverterhub")
public class AccountIndexes {
  @Execution
  public void execute(MongoTemplate mongoTemplate) {
    mongoTemplate.indexOps("user_favorites").ensureIndex(new Index().on("userId", Direction.ASC).on("toolId", Direction.ASC).unique());
    mongoTemplate.indexOps("user_favorites").ensureIndex(new Index().on("userId", Direction.ASC).on("createdAt", Direction.DESC));
    mongoTemplate.indexOps("conversion_history").ensureIndex(new Index().on("userId", Direction.ASC).on("occurredAt", Direction.DESC));
  }

  @RollbackExecution
  public void rollback() {
    // Account data is intentionally retained when a migration is rolled back.
  }
}
