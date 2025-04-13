import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ainoshi Admin",
};

export default function SignIn() {
  return <SignInForm />;
}
