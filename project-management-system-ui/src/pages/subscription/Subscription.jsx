import { annualPlan, freePlan, paidPlan } from "@/constants/SubscriptionConstant"
import SubscriptionCard from "./SubscriptionCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { getUserSubscription } from "@/redux/subscription/Action";

const Subscription = () => {

  const dispatch = useDispatch();
  const { userSubscription } = useSelector(store => store.subscription);  

  useEffect(() => {
    dispatch(getUserSubscription(localStorage.getItem("token")));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard data={{
          planName: "Free",
          features: freePlan,
          planType: "FREE",
          price: 0,
          buttonName: userSubscription?.planType === "FREE" ? "Current Plan" : "Get Started"
        }}/>
        <SubscriptionCard data={{
          planName: "Monthly Paid Plan",
          features: paidPlan,
          planType: "MONTHLY",
          price: 799,
          buttonName: userSubscription?.planType === "MONTHLY" ? "Current Plan" : "Get Started"
        }}/>
        <SubscriptionCard data={{
          planName: "Annual Paid Plan",
          features: annualPlan,
          planType: "ANNUALLY",
          price: 6999,
          buttonName: userSubscription?.planType === "ANNUALLY" ? "Current Plan" : "Get Started"
        }}/>
      </div>
    </div>
  )
}

export default Subscription