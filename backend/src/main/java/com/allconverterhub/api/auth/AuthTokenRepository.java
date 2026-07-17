package com.allconverterhub.api.auth;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface AuthTokenRepository extends MongoRepository<AuthToken, String> { Optional<AuthToken> findByTokenHashAndPurpose(String tokenHash, TokenPurpose purpose); void deleteByUserIdAndPurpose(String userId, TokenPurpose purpose); }
