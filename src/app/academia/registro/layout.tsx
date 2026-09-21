import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro de Estudiante | Academia ARCANO",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegistroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
