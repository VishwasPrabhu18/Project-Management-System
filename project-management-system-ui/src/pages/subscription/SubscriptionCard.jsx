import { Button } from "@/components/ui/button"
import { createPayment } from "@/redux/payment/Action";
import { CheckCircleIcon } from "lucide-react"
import { useDispatch } from "react-redux"

const SubscriptionCard = ({ data }) => {
  const dispatch = useDispatch();

  const handleUpgradePlan = () => {
    dispatch(createPayment({planType: data?.planType, jwt: localStorage.getItem("token")}));
  }

  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">₹{data.price} / </span>
        <span>{data.planType}</span>
      </p>
      {
        data.planType === "ANNUALLY" && <p className="text-green-500">30%</p>
      }
      <Button className={`w-full ${data.buttonName === "Get Started" && "bg-green-400 hover:bg-green-500"}`} onClick={handleUpgradePlan}>
        {data.buttonName}
      </Button>
      <div className="flex flex-col gap-2">
        {
          data.features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircleIcon />
              <p>{item}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SubscriptionCard