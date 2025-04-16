package com.vishwasprabhu18.service;

import com.vishwasprabhu18.constant.PlanType;
import com.vishwasprabhu18.modal.Subscription;
import com.vishwasprabhu18.modal.User;

public interface SubscriptionService {
    Subscription createSubscription(User user) throws Exception;

    Subscription getUserSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType) throws Exception;

    boolean isValid(Subscription subscription);
}
