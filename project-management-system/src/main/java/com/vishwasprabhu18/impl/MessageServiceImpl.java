package com.vishwasprabhu18.impl;

import com.vishwasprabhu18.modal.Chat;
import com.vishwasprabhu18.modal.Message;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.repository.MessageRepository;
import com.vishwasprabhu18.repository.ProjectRepository;
import com.vishwasprabhu18.repository.UserRepository;
import com.vishwasprabhu18.service.MessageService;
import com.vishwasprabhu18.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new Exception("User not found"));
        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender(sender);
        message.setChat(chat);

        Message savedMessage = messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception {
        Chat chat = projectService.getChatByProjectId(projectId);
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
