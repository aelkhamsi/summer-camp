"use client"

import * as React from "react"

import { cn, delay } from "@mdm/utils"
import { LoadingDots, toast, Input, Button, Form, FormControl, FormField, FormItem, FormMessage } from "@mdm/ui"
import { useForm } from "react-hook-form"
import { logIn, signUp } from "@/app/api/AuthApi"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { signUpDefaultValues, signUpSchema } from "@/app/schemas/signup.schema"

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  })
  const router = useRouter()
  const [isFormLoading, setIsFormLoading] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const onSubmit = async (formData: any) => {
    setIsFormLoading(true)
    const { firstName, lastName, email, password } = formData
    const response = await signUp(firstName, lastName, email, password) as any

    switch(response?.statusCode) {
      case 200:
        toast({
          title: 'Account created!',
          description: "You'll be redirected to the homepage",
        })
        
        await delay(500)
        const response = await logIn(email, password) as any
        switch(response?.statusCode) {
          case 200:
            localStorage.setItem('access_token', response?.access_token);
            document.cookie = `access_token=${response?.access_token}`;
            setTimeout(() => {
              window.location.reload();
            }, 1000)
            router.push('/');
            
            break;
          case 400:
            setTimeout(() => {
              window.location.reload();
            }, 1000)
            router.push('/');
            break;
        }
        break;
      case 400:
      case 401:
        setErrorMessage('This email is already used')
        setIsFormLoading(false)
        break
      default:
        setErrorMessage('Server error. Please try later.')
        setIsFormLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* Email Sign Up */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 space-y-2 text-left">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="first-name"
                      placeholder="Prénom"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="first-name"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="last-name"
                      placeholder="Nom"
                      type="text"
                      autoCapitalize="none"
                      autoComplete="last-name"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Mot de passe"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="confirm-password"
                      placeholder="Confirmer mot de passe"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="confirm-password"
                      autoCorrect="off"
                      disabled={isFormLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={isFormLoading}>
              {isFormLoading ? (
                <LoadingDots color="#808080" />
              ) : (
                <p>Créer un compte</p>
              )}
            </Button>

            {errorMessage
              ? <p className="w-full text-red-600 text-sm">
                {errorMessage}
              </p>
              : null
            }
          </div>
        </form>
      </Form>  
    </div>
  )
}