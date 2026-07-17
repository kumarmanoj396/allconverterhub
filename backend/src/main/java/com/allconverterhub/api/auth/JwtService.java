package com.allconverterhub.api.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final SecretKey key;
  private final long accessTokenMinutes;
  private final long refreshTokenDays;
  public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.access-token-minutes}") long accessTokenMinutes, @Value("${app.jwt.refresh-token-days}") long refreshTokenDays) {
    byte[] secretBytes = Decoders.BASE64.decode(secret);
    if (secretBytes.length < 32) throw new IllegalStateException("JWT_SECRET must decode to at least 32 bytes.");
    this.key = Keys.hmacShaKeyFor(secretBytes); this.accessTokenMinutes = accessTokenMinutes; this.refreshTokenDays = refreshTokenDays;
  }
  public String createAccessToken(UserPrincipal principal) { return create(principal, "access", Instant.now().plusSeconds(accessTokenMinutes * 60), UUID.randomUUID().toString()); }
  public String createRefreshToken(UserPrincipal principal, String tokenId) { return create(principal, "refresh", Instant.now().plusSeconds(refreshTokenDays * 86400), tokenId); }
  public Claims parse(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload(); }
  public long getAccessTokenSeconds() { return accessTokenMinutes * 60; }
  public long getRefreshTokenSeconds() { return refreshTokenDays * 86400; }
  private String create(UserPrincipal principal, String type, Instant expiration, String tokenId) { return Jwts.builder().subject(principal.id()).claim("email", principal.email()).claim("type", type).id(tokenId).issuedAt(new Date()).expiration(Date.from(expiration)).signWith(key).compact(); }
  public record UserPrincipal(String id, String email) { }
}
