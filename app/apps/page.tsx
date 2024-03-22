import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { appManagerService } from "@/service"

export default async function IndexPage() {
  const apps = await appManagerService.getAppList(1, 100);
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {apps &&
          apps.data.map((app) => (
            <Link key={app.slug} href={`/d/${app.slug}`}>
              <Card>
                <CardContent className="p-3">
                  <div className="container flex p-3 pl-1">
                    <Image
                      className="rounded-lg"
                      src={app.icon || "/default.jpg"}
                      alt="Icon of the application"
                      width={64}
                      height={64}
                    ></Image>
                    <div className="ml-4 space-y-2">
                      <div className="text-2xl font-bold">{app.name}</div>
                      <p className="text-xs text-muted-foreground">
                        {app.slug}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </section>
  )
}
