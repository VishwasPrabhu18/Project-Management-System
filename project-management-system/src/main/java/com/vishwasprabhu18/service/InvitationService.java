package com.vishwasprabhu18.service;

import com.vishwasprabhu18.modal.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {
    void sendInvitation(String email, Long projectId) throws MessagingException;

    Invitation acceptInvitation(String token, Long userId) throws Exception;

    String getTokenByUserMail(String userEmail);

    void deleteToken(String token);
}
