import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const ChatBox = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => { }

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {
            [1, 1, 1, 1].map((item, idx) => (
              idx % 2 === 0 ? (
                <div key={item} className="flex gap-2 mb-2 justify-start">
                  <Avatar className="dark">
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                    <p>Vishwas</p>
                    <p className="text-gray-300">How are you?</p>
                  </div>
                </div>
              ) : (
                <div key={item} className="flex gap-2 mb-2 justify-end">
                  <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                    <p>Vishwas</p>
                    <p className="text-gray-300">How are you?</p>
                  </div>
                  <Avatar className="dark">
                    <AvatarFallback>V</AvatarFallback>
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