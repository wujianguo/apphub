"use client"

import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/layout/header"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
import { CreateOrganizationButton } from "./components/create-org"

export default function IndexPage() {
  const { data: organizations } = authClient.useListOrganizations()

  const [orgs, setOrgs] = useState(organizations)
  useEffect(() => {
    setOrgs(organizations)
  }, [organizations]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">

        <section className="grid items-center gap-6 px-4 md:px-8 pb-8 pt-6 md:py-10">

          <div className="flex items-center justify-between">
            <Input
              placeholder="Search"
              className="h-8 w-[150px] lg:w-[250px]"
              disabled={!organizations}
              onChange={(e) => {
                const value = e.target.value
                if (value === "") {
                  setOrgs(organizations)
                  return
                }
                if (!organizations) return
                setOrgs(organizations.filter((org) => {
                  return org.name.toLowerCase().includes(value.toLowerCase()) || org.slug.toLowerCase().includes(value.toLowerCase())
                }))
              }}
            />
            <CreateOrganizationButton />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {orgs &&
              orgs.map((org) => (
                <Link key={org.slug} href={`/orgs/${org.slug}`}>
                  <Card>
                    <CardContent className="p-3">
                      <div className="container flex p-3 pl-1">
                        <Image
                          className="rounded-lg"
                          src={org.logo || "/default.jpg"}
                          alt="Logo of the organization"
                          width={64}
                          height={64}
                        ></Image>
                        <div className="ml-4 space-y-2">
                          <div className="text-2xl font-bold">{org.name}</div>
                          <p className="text-xs text-muted-foreground">
                            {org.slug}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
