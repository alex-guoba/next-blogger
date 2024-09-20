
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 
function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Code or Token expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
export default function ErrorCodePage() {
    return (
        <AlertDestructive></AlertDestructive>
    );
}