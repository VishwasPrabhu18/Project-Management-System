import { Button } from "@/components/ui/button"
import { CheckCircleIcon } from "lucide-react"

const SubscriptionCard = ({ data }) => {
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
      <Button className="w-full dark">
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