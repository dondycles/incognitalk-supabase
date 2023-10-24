import Main from "@/components/ui/Main";
import Nav from "@/components/ui/Nav";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main className="gap-4">
      <Nav />
      {children}
    </Main>
  );
}
