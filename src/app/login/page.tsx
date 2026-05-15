import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return <LoginForm adminEmail={process.env.ADMIN_EMAIL ?? ""} />;
}
