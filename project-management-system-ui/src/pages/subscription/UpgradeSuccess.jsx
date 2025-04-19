import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { upgradeSubscription } from '@/redux/subscription/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpgradeSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userSubscription } = useSelector(store => store.subscription);
  
  const queryParam = new URLSearchParams(location.search);
  const planType = queryParam.get("planType");

  useEffect(() => { 
    dispatch(upgradeSubscription({planType}))
  }, []);

  return (
    <div className='flex justify-center dark'>
      <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
        <div className='flex items-center gap-4'>
          <CheckCircledIcon className='h-9 w-9 text-green-500' />
          <p className='text-xl'>Plan Upgraded Successfully</p>
        </div>
        <div className='space-y-3'>
          <p>Plan Type: {planType}</p>
          <p className='text-green-500'>Start Date: { userSubscription?.subscriptionStartDate}</p>
          <p className='text-red-500'>End Date: { userSubscription?.subscriptionEndDate}</p>
        </div>
        <Button onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Card>
    </div>
  )
}

export default UpgradeSuccess