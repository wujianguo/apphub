import { AuthCard } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui/server"

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }))
}

export default async function AuthPage(
  { params }: { params: Promise<{ pathname: string }> }
) {
  const { pathname } = await params

  return (
    // <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <main className="flex flex-col grow p-4 items-center justify-center">
        <AuthCard pathname={pathname} />
      </main>
    // </div>
  )
}