"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'


const AuthForm = ({ type }: { type: string }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // 1. Define the form.
  const form = useForm<z.infer<typeof authformSchema>>({
    resolver: zodResolver(authformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    console.log(values)
    setLoading(false)
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className=' flex px-4 cursor-pointer items-center gap-1'>
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt='Horizon logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
            }
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link Your account to get started'
                : 'Please enter your details to get started'
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          {/* PlaidLink*/}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput control={form.control} name="email" lable="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" lable="Password" placeholder="Enter your password" />
              <Button type="submit" className='form-btn' disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                  </>
                ) : type === 'sign-in' ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          </Form>

          <footer>
            
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm