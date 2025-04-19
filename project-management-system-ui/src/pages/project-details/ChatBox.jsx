import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/redux/chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { auth, chat } = useSelector(store => store);
  const { projectId } = useParams();  

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const messageData = {
      senderId: auth?.user?.id,
      projectId: projectId,
      content: message,
    };

    dispatch(sendMessage(messageData));
    setMessage("");
  }

  useEffect(() => {
    dispatch(fetchChatByProject(projectId));
  }, []);

  useEffect(() => {
    dispatch(fetchChatMessages(projectId));
  }, []);

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {
           chat?.messages?.map(item => (
              item?.sender?.id !== auth?.user?.id ?(
                <div key={item} className="flex gap-2 mb-2 justify-start">
                  <Avatar className="dark">
                   <AvatarFallback>{item?.sender?.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                    <p>{item?.sender?.fullName}</p>
                    <p className="text-gray-300">{item?.content}</p>
                  </div>
                </div>
              ) : (
                <div key={item} className="flex gap-2 mb-2 justify-end">
                  <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                    <p>{item?.sender?.fullName}</p>
                    <p className="text-gray-300">{item?.content}</p>
                  </div>
                  <Avatar className="dark">
                    <AvatarFallback>{item?.sender?.fullName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              )
            ))
          }
        </ScrollArea>
        <div className="relative p-0">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
          />
          <Button
            className="absolute right-2 top-3 rounded-full dark"
            onClick={handleSendMessage}
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox