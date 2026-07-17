import type { Metadata } from "next";
import EmailVerification from "@/components/auth/EmailVerification";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your AllConverterHub account email address.",
  robots: { index: false, follow: false },
};

interface VerifyEmailPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const { token } = await searchParams;
  return <EmailVerification token={typeof token === "string" ? token : undefined} />;
}
