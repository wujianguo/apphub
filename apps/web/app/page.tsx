import { Button } from "@repo/ui/components/button"
import { Badge } from "@repo/ui/components/badge"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <Badge variant="outline">Badge</Badge>
      </div>
    </div>
  )
}
