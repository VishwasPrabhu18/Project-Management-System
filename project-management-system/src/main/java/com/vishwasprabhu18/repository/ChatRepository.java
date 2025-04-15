package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
