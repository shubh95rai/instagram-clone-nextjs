"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RegisterSchema } from "@/schemas/schemas";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRegisterSchema } from "@/schemas/schemas";
import { registerUserAction } from "@/actions/actions";
import LoadingButton from "./LoadingButton";


export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(data: TRegisterSchema) {
    const result = await registerUserAction(data);

    if (result.success) {
      // redirect("/login");
      reset();
    } else {
      setError("root", { message: result.message });
    }
  }

  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4 *:space-y-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                placeholder="******"
                type="password"
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm text-center bg-red-700/30 p-2 rounded-md">
              {errors.root.message}
            </p>
          )}

          {isSubmitSuccessful && (
            <p className="text-green-500 text-sm text-center bg-green-700/30 p-2 rounded-md">
              Registration successful
            </p>
          )}

          {/* <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Register"}
          </Button> */}
          <LoadingButton pending={isSubmitting} text="Register" />
        </form>

        <p className="text-sm text-muted-foreground text-center">
          Already have and account?
          <Link href="/login" className="font-semibold text-primary ml-1">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
