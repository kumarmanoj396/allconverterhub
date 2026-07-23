package com.allconverterhub.api.account;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserFavoriteRepository extends MongoRepository<UserFavorite, String> {
  List<UserFavorite> findByUserIdOrderByCreatedAtDesc(String userId);
  boolean existsByUserIdAndToolId(String userId, String toolId);
  void deleteByUserIdAndToolId(String userId, String toolId);
}
