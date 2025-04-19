import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import IssueCard from "./IssueCard"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchIssues } from "@/redux/issue/Action";

const IssueList = ({ status, title }) => {
  const dispatch = useDispatch();
  const { issues } = useSelector(store => store.issue);
  const { projectId } = useParams();  
  
  useEffect(() => { 
    dispatch(fetchIssues(projectId));
  }, [projectId]);

  return (
    <div>
      <Card className="w-full md:w-[300px] lg:w-[310px] dark">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-2">
            {
              issues.map(issue => (
                issue?.status === status && (
                  <IssueCard key={issue?.id} issue={issue} />
                ))
              )
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default IssueList