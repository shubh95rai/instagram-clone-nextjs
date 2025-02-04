import { auth } from "@/auth";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default async function LayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div>
      <div className="flex">
        {session && <DesktopNav />}
        <div className="w-full p-4">{children}</div>
      </div>
      {session && <MobileNav />}
    </div>
  );
}
