import AnnouncementBar from "./announcement-bar";
import Navbar from "./navbar";
import Footer from "./footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-(--background)">
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}