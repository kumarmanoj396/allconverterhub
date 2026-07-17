package com.allconverterhub.api.config;

import com.allconverterhub.api.security.JwtAuthenticationFilter;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration @EnableWebSecurity
public class SecurityConfig {
  @Bean public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
  @Bean public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception { return http.csrf(AbstractHttpConfigurer::disable).cors(cors -> { }).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**", "/docs/**", "/v3/api-docs/**", "/error").permitAll().requestMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated()).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).build(); }
  @Bean public CorsConfigurationSource corsConfigurationSource(@Value("${app.frontend-url}") String frontendUrl) { CorsConfiguration configuration = new CorsConfiguration(); configuration.setAllowedOrigins(List.of(frontendUrl)); configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); configuration.setExposedHeaders(List.of("Authorization")); UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); source.registerCorsConfiguration("/**", configuration); return source; }
}
