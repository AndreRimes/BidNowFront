import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col   items-center justify-center text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-white">
            Continue Conectando
        </h2>
        <p className="mx-auto max-w-[700px] text-zinc-100 md:text-lg dark:text-zinc-800">
            Conecte-se com nossos parceiros para ter acesso a todos os nossos conteúdos.
        </p>
        <div className="w-full max-w-md space-y-2 my-4">
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1 text-zinc-900 bg-white" />
            <Button type="submit" variant="default" >
              Subscribe
            </Button>
          </form>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="#" aria-label="Facebook page" className="text-white" prefetch={false}>
            <FacebookIcon className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="Twitter profile" className="text-white" prefetch={false}>
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="Instagram profile" className="text-white" prefetch={false}>
            <InstagramIcon className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="LinkedIn profile" className="text-white" prefetch={false}>
            <LinkedinIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}