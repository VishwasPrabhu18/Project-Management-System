package com.vishwasprabhu18.controller;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.vishwasprabhu18.constant.PlanType;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.response.PaymentLinkResponse;
import com.vishwasprabhu18.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    @Autowired
    private UserService userService;

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
            @PathVariable PlanType planType,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        int amount = 799 * 100;
        if (planType.equals(PlanType.ANNUALLY)) {
            amount = amount * 12;
            amount = (int) (amount * 0.7);
        }

        RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

        JSONObject paymentLinkRequest = getPaymentLinkRequestJsonObject(planType, amount, user);

        PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);
        String paymentLinkId = paymentLink.get("id");
        String paymentLinkUrl = paymentLink.get("short_url");

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();
        paymentLinkResponse.setPayment_link_url(paymentLinkUrl);
        paymentLinkResponse.setPayment_link_id(paymentLinkId);

        return new ResponseEntity<>(paymentLinkResponse, HttpStatus.CREATED);

    }

    private JSONObject getPaymentLinkRequestJsonObject(PlanType planType, int amount, User user) {
        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", amount);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", user.getFullName());
        customer.put("email", user.getEmail());

        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);

        paymentLinkRequest.put("notify", notify);
        paymentLinkRequest.put("callback_url", "http://localhost:5173/upgrade_plan/success?planType" + planType);
        return paymentLinkRequest;
    }
}