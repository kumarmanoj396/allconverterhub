package com.allconverterhub.api.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  private final JavaMailSender mailSender;
  private final String from;
  private final String frontendUrl;

  public EmailService(JavaMailSender mailSender, @Value("${app.mail-from}") String from,
      @Value("${app.frontend-url}") String frontendUrl) {
    this.mailSender = mailSender;
    this.from = from;
    this.frontendUrl = frontendUrl.replaceAll("/$", "");
  }

  public void sendVerification(String email, String token) {
    send(email, "Verify your AllConverterHub email",
        "Verify your email: " + frontendUrl + "/verify-email?token=" + token);
  }

  public void sendPasswordReset(String email, String token) {
    send(email, "Reset your AllConverterHub password",
        "Reset your password: " + frontendUrl + "/reset-password?token=" + token);
  }

  private void send(String recipient, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(from);
    message.setTo(recipient);
    message.setSubject(subject);
    message.setText(text);
    mailSender.send(message);
  }
}
