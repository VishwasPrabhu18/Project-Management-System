import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const CreateCommentForm = ({ issueId }) => {
  const form = useForm({
    defaultValues: {
      content: "",
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="my-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-5 flex gap-2'>
          <FormField console={form.control}
            name="content"
            render={({ field }) =>
              <FormItem className="flex gap-2 items-center">
                <div>
                  <Avatar>
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-[20rem]"
                    placeholder="Enter your comment here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }
          />
          <Button type="submit" variant="outline" className="dark cursor-pointer">Comment</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateCommentForm