"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import GoogleButton from 'react-google-button'
// import { redirect } from 'next/dist/server/api-utils';



const Login = () => {
    const [error, setError] = useState('')
    console.log(error)
    const session = useSession()
    const router = useRouter()

    console.log(session)

    useEffect(() => {
        if(session?.status == "authenticated") {
            if(session?.data?.user?.role == "user"){
                router.replace('/user')
            }
            if(session?.data?.user?.role == "admin"){
                router.replace('/dashboard')
            }
        }
    }, [session, router])

    const isemailValid = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        if (!isemailValid(email)) {
            setError("email not valid")
            return
        }
        if (!password || password.length < 4) {
            setError("password must be greater than 4")
            return;
        }

        const res = signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if (res?.error) {
            setError("erroro")
        }
        if (res?.url) router.replace('/')
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        Adeeb
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <p className='text-red-500'>{error && error}</p>
                                    </div>
                                    <Link href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                          
                                    <GoogleButton className='text-center' onClick={()=>{signIn("google")}}/>
                               


                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login