package com.vishwasprabhu18.repository;

import com.vishwasprabhu18.modal.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByUserId(Long userId);
}
