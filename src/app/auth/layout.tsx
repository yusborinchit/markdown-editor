import AuthContainer from "~/components/containers/auth-container";

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  return <AuthContainer>{children}</AuthContainer>;
}
