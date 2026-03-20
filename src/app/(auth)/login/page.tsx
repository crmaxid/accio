'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Login01Icon,
  Mail01Icon,
  LockPasswordIcon,
  EyeFreeIcons,
  EyeIcon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LoginSchema, type LoginFormData } from '@/schemas/auth'
import { toast } from 'sonner'
import { useAuth } from '@/services'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        toast.success('Login successful!')
        router.push('/crmax')
      },
      onError: (error) => {
        console.log(error)
        toast.error(
          'Login failed. Please check your credentials and try again.',
        )
      },
    })
  })

  return (
    <main className="flex h-screen w-full">
      <div className="flex w-full items-center justify-center">
        <Card className="w-1/2">
          <CardHeader>
            <div className="just mb-7 flex flex-col items-center">
              <div className="mb-6 flex size-11 items-center justify-center rounded-xl bg-orange-50 ring-1 ring-orange-100">
                <HugeiconsIcon
                  icon={Login01Icon}
                  className="size-5"
                  strokeWidth={2}
                  color="#EA580C"
                />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Sign in to your account to continue
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <InputGroup className="h-10">
                    <InputGroupAddon>
                      <HugeiconsIcon icon={Mail01Icon} />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register('email')}
                    />
                  </InputGroup>
                  <FieldError errors={[errors.email]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup className="h-10">
                    <InputGroupAddon>
                      <HugeiconsIcon icon={LockPasswordIcon} />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register('password')}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="cursor-pointer"
                      >
                        <HugeiconsIcon
                          icon={showPassword ? EyeFreeIcons : EyeIcon}
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldError errors={[errors.password]} />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={login.isPending}
                className="mt-6 h-10 w-full bg-orange-600 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-60"
              >
                {login.isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="relative w-full">
        <Image
          src="https://api.minio.runeforge.tech/crmax-assets/banner.jpeg"
          alt="CRMax banner"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
          className="object-cover"
          priority
        />
      </div>
    </main>
  )
}
