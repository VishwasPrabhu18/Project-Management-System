import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { assignedUserToIssue } from "@/redux/issue/Action";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({issue}) => {
  const { projectDetails } = useSelector(store => store.project);
  const dispatch = useDispatch();
  
  const handleIssueAssign = (userId) => {
    dispatch(assignedUserToIssue({issueId: issue?.id, userId}));
  }

  return (
    <>
      <div className="space-y-2">
        <div className="rounded-md">
          <p className="py-2 px-3">{issue?.assignee?.fullName || "Unassigned"}</p>
          <hr />
        </div>
        {
          projectDetails?.team?.map((item) => (
            <div
              key={item}
              className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
              onClick={() => handleIssueAssign(item.id)}
            >
              <Avatar>
                <AvatarFallback>{item?.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm leading-none">{item.fullName}</p>
                <p className="text-sm text-muted-foreground">@{item.fullName.toLowerCase()}</p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default UserList