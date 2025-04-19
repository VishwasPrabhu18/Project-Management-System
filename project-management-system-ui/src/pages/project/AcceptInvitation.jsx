import { Button } from '@/components/ui/button'
import { acceptInvitation } from '@/redux/project/Action';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AcceptInvitation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  const handleAcceptInvitation = () => {
    dispatch(acceptInvitation({ invitationToken: token, navigate }));
  }

  return (
    <div className='h-[85vh] flex flex-col justify-center items-center'>
      <h1 className='py-5 font-semibold text-xl'>You have invited to join the project: </h1>
      <Button onClick={handleAcceptInvitation}>Accept Invitation</Button>
    </div>
  )
}

export default AcceptInvitation