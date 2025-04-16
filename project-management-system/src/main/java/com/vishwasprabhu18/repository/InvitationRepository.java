package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Invitation findByToken(String token);

    Invitation findByEmail(String email);
}
