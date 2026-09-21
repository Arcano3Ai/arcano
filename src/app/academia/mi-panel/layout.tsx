import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Panel de Estudiante | Academia ARCANO",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MiPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
