package com.allconverterhub.api.account;

import com.allconverterhub.api.account.AccountDtos.ChangePasswordRequest;
import com.allconverterhub.api.account.AccountDtos.ConversionHistoryRequest;
import com.allconverterhub.api.account.AccountDtos.ConversionHistoryResponse;
import com.allconverterhub.api.account.AccountDtos.MessageResponse;
import com.allconverterhub.api.account.AccountDtos.ProfileResponse;
import com.allconverterhub.api.account.AccountDtos.ToolPreferenceResponse;
import com.allconverterhub.api.account.AccountDtos.UpdateProfileRequest;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/me")
public class AccountController {
  private final AccountService accountService;
  public AccountController(AccountService accountService) { this.accountService = accountService; }

  @GetMapping("/profile") public ProfileResponse profile(Authentication authentication) { return accountService.profile(authentication.getName()); }
  @PatchMapping("/profile") public ProfileResponse updateProfile(Authentication authentication, @Valid @RequestBody UpdateProfileRequest request) { return accountService.updateProfile(authentication.getName(), request); }
  @PostMapping("/change-password") public MessageResponse changePassword(Authentication authentication, @Valid @RequestBody ChangePasswordRequest request) { accountService.changePassword(authentication.getName(), request); return new MessageResponse("Password updated."); }
  @PostMapping("/resend-verification") public MessageResponse resendVerification(Authentication authentication) { accountService.resendVerification(authentication.getName()); return new MessageResponse("Verification email sent."); }
  @GetMapping("/favorites") public List<ToolPreferenceResponse> favorites(Authentication authentication) { return accountService.favorites(authentication.getName()); }
  @PutMapping("/favorites/{toolId}") public MessageResponse saveFavorite(Authentication authentication, @PathVariable String toolId) { accountService.saveFavorite(authentication.getName(), toolId); return new MessageResponse("Favorite saved."); }
  @DeleteMapping("/favorites/{toolId}") public MessageResponse removeFavorite(Authentication authentication, @PathVariable String toolId) { accountService.removeFavorite(authentication.getName(), toolId); return new MessageResponse("Favorite removed."); }
  @GetMapping("/conversion-history") public List<ConversionHistoryResponse> history(Authentication authentication) { return accountService.history(authentication.getName()); }
  @PostMapping("/conversion-history") public MessageResponse recordHistory(Authentication authentication, @Valid @RequestBody ConversionHistoryRequest request) { accountService.recordHistory(authentication.getName(), request); return new MessageResponse("Activity recorded."); }
}
