import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const CreateIssueForm = () => {
  const form = useForm({
    // resolver: zod
    defaultValues: {
      issueName: "",
      description: "",
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField console={form.control}
            name="issueName"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Issue Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <FormField console={form.control}
            name="description"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Issue Description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>}
          />
          <DialogClose>
            <Button type="submit" className="w-full">Create Issue</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default CreateIssueForm