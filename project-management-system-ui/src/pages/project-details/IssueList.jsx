import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import IssueCard from "./IssueCard"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { DialogTitle } from "@radix-ui/react-dialog"
import CreateIssueForm from "./CreateIssueForm"

const IssueList = ({ status, title }) => {
  return (
    <div>
      <Dialog>
        <Card className="w-full md:w-[300px] lg:w-[310px] dark">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-2">
              {
                [1, 1, 1].map(item => (
                  <IssueCard key={item} />
                ))
              }
            </div>
          </CardContent>
          <CardFooter>
            <DialogTrigger>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <PlusIcon />
                Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Mew Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default IssueList