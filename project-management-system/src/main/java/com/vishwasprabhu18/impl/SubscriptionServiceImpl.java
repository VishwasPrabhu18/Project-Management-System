package com.vishwasprabhu18.impl;

import com.vishwasprabhu18.constant.PlanType;
import com.vishwasprabhu18.modal.Subscription;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.repository.SubscriptionRepository;
import com.vishwasprabhu18.service.SubscriptionService;
import com.vishwasprabhu18.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private UserService userService;

    @Override
    public Subscription createSubscription(User user) throws Exception {
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setIsvalid(true);
        subscription.setPlanType(PlanType.FREE);

        return  subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getUserSubscription(Long userId) throws Exception {
        Subscription subscription =  subscriptionRepository.findByUserId(userId);

        if(!isValid(subscription)) {
            subscription.setPlanType(PlanType.FREE);
            subscription.setSubscriptionStartDate(LocalDate.now());
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }

        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) throws Exception {
        Subscription subscription = subscriptionRepository.findByUserId(userId);
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());

        if(planType.equals(PlanType.ANNUALLY)) {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        } else {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }

        return subscriptionRepository.save(subscription);
    }

    @Override
    public boolean isValid(Subscription subscription) {
        if(subscription.getPlanType().equals(PlanType.FREE))
            return true;

        LocalDate endDate = subscription.getSubscriptionEndDate();
        LocalDate currentDate = LocalDate.now();

        return endDate.isAfter(currentDate) || endDate.isEqual(currentDate);
    }
}
