"use client";

import { loginUserAction, signInAction } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema, TLoginSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import LoadingButton from "./LoadingButton";
import { useEffect } from "react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function onSubmit(data: TLoginSchema) {
    const result = await loginUserAction(data);

    if (result.success) {
      // redirect("/");
      router.push("/profile");
      router.refresh();
    } else {
      setError("root", { message: result.message });
    }
  }

  async function onGoogleLogin() {
    await signInAction();
  }

  const searchParams = useSearchParams();
  const oAuthAccountNotLinkedError = searchParams.get("error");

  useEffect(() => {
    if (oAuthAccountNotLinkedError) {
      setError("root", {
        message: "Please use your email and password to login",
      });

      router.replace("/login");
    }
  }, [oAuthAccountNotLinkedError, router]);

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4 *:space-y-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="******"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.root && (
              <p className="rounded-md bg-red-700/30 p-2 text-center text-sm text-red-500">
                {errors.root.message}
              </p>
            )}
          </div>

          {/* <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Login"}
          </Button> */}

          <LoadingButton pending={isSubmitting} text="Login" />
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-xs uppercase text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        <form action={onGoogleLogin}>
          <Button variant="outline" className="w-full">
            <FaGoogle />
            <span>Google</span>
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?
          <Link href="/register" className="ml-1 font-semibold text-primary">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
