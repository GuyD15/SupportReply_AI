import { LoginForm } from "@/components/auth/login-form";

type LoginPageProps = {
  searchParams: {
    next?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <LoginForm nextPath={searchParams.next || "/"} />
    </main>
  );
}
