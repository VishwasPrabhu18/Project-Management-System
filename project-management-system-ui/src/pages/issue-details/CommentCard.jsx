import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons"

const CommentCard = () => {
  return (
    <div className="flex justify-between">
      <div className="items-center flex gap-4">
        <Avatar>
          <AvatarFallback>
            V
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <p className="">Vishwas Prabhu</p>
          <p>How much work is pending?</p>
        </div>
      </div>
      <Button className="dark rounded-full" variant="ghost" size="icon">
        <TrashIcon />
      </Button>
    </div>
  )
}

export default CommentCard