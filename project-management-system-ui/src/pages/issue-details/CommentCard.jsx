import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { deleteComment } from "@/redux/comment/Action"
import { TrashIcon } from "@radix-ui/react-icons"
import { useDispatch } from "react-redux"

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment?.id))
  }
  return (
    <div className="flex justify-between">
      <div className="items-center flex gap-4">
        <Avatar>
          <AvatarFallback>
            {comment?.user?.fullName?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <p className="">{comment?.user?.fullName}</p>
          <p>{comment?.content}</p>
        </div>
      </div>
      <Button className="dark rounded-full" variant="ghost" size="icon" onClick={handleDeleteComment}>
        <TrashIcon />
      </Button>
    </div>
  )
}

export default CommentCard