package com.allconverterhub.api.account;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConversionHistoryRepository extends MongoRepository<ConversionHistory, String> {
  List<ConversionHistory> findTop20ByUserIdOrderByOccurredAtDesc(String userId);
}
