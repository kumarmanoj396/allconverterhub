import type { Metadata } from "next";
import PasswordReset from "@/components/auth/PasswordReset";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Set a new AllConverterHub account password.",
  robots: { index: false, follow: false },
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string | string[] }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token } = await searchParams;
  return <PasswordReset token={typeof token === "string" ? token : undefined} />;
}
