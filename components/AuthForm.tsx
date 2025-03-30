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
import SignUp from '@/app/(auth)/sign-up/page'
import { useRouter } from 'next/navigation'


const AuthForm = ({ type }: { type: string }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const formSchema = authformSchema(type);
  const router = useRouter()

  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      // sign up with appwrite & create plaid link token
      if (type === "sign-up") {
        // const newUser =await signUp(data)
        // setUser(newUser)

      }
      if (type === "sign-in") {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // })

        // if(response) router.push("/")

      }
    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }

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

              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="firstName" lable="First Name" placeholder="Enter your first name" />
                    <CustomInput control={form.control} name="lastName" lable="Last Name" placeholder="Enter your last name" />
                  </div>

                  <CustomInput control={form.control} name="address1" lable="Address" placeholder="Enter your address" />
                  <CustomInput control={form.control} name="city" lable="City" placeholder="Enter your city" />
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="state" lable="State" placeholder="Enter your state" />
                    <CustomInput control={form.control} name="postalCode" lable="Zip" placeholder="Enter your zip code" />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput control={form.control} name="dateOfBirth" lable="Date of Birth" placeholder="YYYY-MM-DD" />
                    <CustomInput control={form.control} name="ssn" lable="Social Security Number" placeholder="Ex: 123-45-6789" />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name="email" lable="Email" placeholder="Enter your email" />
              <CustomInput control={form.control} name="password" lable="Password" placeholder="Enter your password" />

              <div className='flex flex-col gap-4'>
                <Button type="submit" className='form-btn' disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                    </>
                  ) : type === 'sign-in' ? "Sign In" : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>{type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}</p>
            <Link href={type === 'sign-in' ? "/sign-up" : "/sign-in"} className='form-link'>
              {type === 'sign-in' ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm