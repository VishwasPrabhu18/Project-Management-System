import { annualPlan, freePlan, paidPlan } from "@/constants/SubscriptionConstant"
import SubscriptionCard from "./SubscriptionCard"

const Subscription = () => {
  return (
    <div className="p-10">
      <h1 className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</h1>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard data={{
          planName: "Free",
          features: freePlan,
          planType: "FREE",
          price: 0,
          buttonName: true ? "Current Plan" : "Get Started"
        }}/>
        <SubscriptionCard data={{
          planName: "Monthly Paid Plan",
          features: paidPlan,
          planType: "MONTHLY",
          price: 799,
          buttonName: true ? "Current Plan" : "Get Started"
        }}/>
        <SubscriptionCard data={{
          planName: "Annual Paid Plan",
          features: annualPlan,
          planType: "ANNUALLY",
          price: 6999,
          buttonName: true ? "Current Plan" : "Get Started"
        }}/>
      </div>
    </div>
  )
}

export default Subscription