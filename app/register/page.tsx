import RegisterForm from "@/components/RegisterForm";

export default async function Register() {
  return (
    <div className="min-h-[calc(100vh-32px)] flex items-center justify-center px-4">
      <RegisterForm />
    </div>
  );
}
