interface Props {
  children: React.ReactNode;
}

export default function MainContainer({ children }: Readonly<Props>) {
  return <div className="mx-auto max-w-3xl px-6">{children}</div>;
}
