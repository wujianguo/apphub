"use client"

import { SiteHeader } from '@/components/layout/header'
import { Button } from '@repo/ui/components/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">

        {/* <section className="grid items-center gap-6 px-4 md:px-8 pb-8 pt-6 md:py-10">
          Documents.
        </section> */}
        <div className='h-[calc(100vh-94px)]'>
          <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
            <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
            <span className='font-medium'>Oops! Page Not Found!</span>
            <p className='text-center text-muted-foreground'>
              It seems like the page you&apos;re looking for <br />
              does not exist or might have been removed.
            </p>
            <div className='mt-6 flex gap-4'>
              <Button variant='outline' onClick={() => router.back()}>
                Go Back
              </Button>
              <Button onClick={() => router.replace('/')}>Back to Home</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
