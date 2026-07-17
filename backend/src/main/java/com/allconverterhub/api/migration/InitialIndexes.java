package com.allconverterhub.api.migration;

import com.allconverterhub.api.auth.TokenPurpose;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;

@ChangeUnit(id = "initial-auth-indexes", order = "001", author = "allconverterhub")
public class InitialIndexes {
  @Execution
  public void execute(MongoTemplate mongoTemplate) {
    mongoTemplate.indexOps("users").ensureIndex(new Index().on("email", Direction.ASC).unique());
    mongoTemplate.indexOps("auth_tokens").ensureIndex(new Index().on("tokenHash", Direction.ASC).unique());
    mongoTemplate.indexOps("auth_tokens").ensureIndex(new Index().on("expiresAt", Direction.ASC).expire(0));
    mongoTemplate.indexOps("auth_tokens")
        .ensureIndex(new Index().on("userId", Direction.ASC).on("purpose", Direction.ASC));
  }

  @RollbackExecution
  public void rollback(MongoTemplate mongoTemplate) {
    mongoTemplate.dropCollection("auth_tokens");
    mongoTemplate.dropCollection("users");
  }
}
