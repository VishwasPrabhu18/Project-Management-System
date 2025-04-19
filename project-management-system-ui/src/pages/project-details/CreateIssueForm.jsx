import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PriorityList } from "@/constants/ProjectIssueConstant";
import { createIssue } from "@/redux/issue/Action";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CreateIssueForm = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
      projectId: projectId,
      priority: "low",
    }
  });

  const onSubmit = (data) => {
    dispatch(createIssue(data));
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField console={form.control}
            name="title"
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
          <FormField console={form.control}
            name="priority"
            render={({ field }) =>
              <FormItem>
                <FormControl>
                  <Select
                    defaultValues="low"
                    value={field.value}
                    onValueChange={field.onChange}
                  // className="border w-full border-gray-700 p-5"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent className="dark">
                      {PriorityList.map((priority, idx) => (
                        <SelectItem key={idx} value={priority.value}>{priority.lable}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />

              </FormItem>
            }
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