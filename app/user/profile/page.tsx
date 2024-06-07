import { auth } from "@/service/auth"

export default async function ProfilePage() {
  const session = await auth()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      profile {session?.user?.name}
    </section>
  )
}
