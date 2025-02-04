import LoginForm from "@/components/LoginForm";

export default async function Login() {
  return (
    <div className="flex min-h-[calc(100vh-32px)] items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
