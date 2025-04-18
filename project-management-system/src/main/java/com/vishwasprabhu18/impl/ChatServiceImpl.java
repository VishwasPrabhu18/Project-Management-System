package com.vishwasprabhu18.impl;

import com.vishwasprabhu18.modal.Chat;
import com.vishwasprabhu18.repository.ChatRepository;
import com.vishwasprabhu18.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }
}
