package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId) throws Exception;
}
