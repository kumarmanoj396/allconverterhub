package com.allconverterhub.api.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class EmailService {
  private static final String RESEND_EMAILS_URL = "https://api.resend.com/emails";

  private final RestClient restClient;
  private final String apiKey;
  private final String from;
  private final String frontendUrl;

  public EmailService(
      @Value("${app.resend-api-key}") String apiKey,
      @Value("${app.mail-from}") String from,
      @Value("${app.frontend-url}") String frontendUrl) {
    this.restClient = RestClient.create();
    this.apiKey = apiKey;
    this.from = from;
    this.frontendUrl = frontendUrl.replaceAll("/$", "");
  }

  public void sendVerification(String email, String token) {
    send(
        email,
        "Verify your AllConverterHub email",
        "Verify your email: " + frontendUrl + "/verify-email?token=" + token);
  }

  public void sendPasswordReset(String email, String token) {
    send(
        email,
        "Reset your AllConverterHub password",
        "Reset your password: " + frontendUrl + "/reset-password?token=" + token);
  }

  private void send(String recipient, String subject, String text) {
    if (apiKey.isBlank()) {
      throw new IllegalStateException("RESEND_API_KEY must be configured to send email.");
    }

    restClient.post()
        .uri(RESEND_EMAILS_URL)
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
        .header(HttpHeaders.USER_AGENT, "allconverterhub-api")
        .contentType(MediaType.APPLICATION_JSON)
        .body(new ResendEmail(from, recipient, subject, text))
        .retrieve()
        .toBodilessEntity();
  }

  private record ResendEmail(String from, String to, String subject, String text) {
  }
}