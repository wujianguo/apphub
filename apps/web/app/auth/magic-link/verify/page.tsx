import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { Terminal } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Authentication | Verify',
  description: 'Verify page for authentication.'
};

export default function VerifyPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Check your email!</AlertTitle>
        <AlertDescription>
          A sign in link has been sent to your email address.
        </AlertDescription>
      </Alert>
    </div>
  )
}
