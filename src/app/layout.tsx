import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedOut, SignInButton } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavBar from "@/components/NavBar";
import SideBar, { UnAuthSidebar } from "@/components/SideBar";
import { Toaster } from "react-hot-toast";
import BottomNavBar from "@/components/BottomNavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "InstaVibe",
  description: "A project inspired by Instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="min-w-screen">
              <NavBar />
              <main className="py-8 pb-24 md:pb-8">
                {/* container to center the content */}
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      <SideBar />
                    </div>
                    <div className="lg:col-span-9">
                      {children}
                      {/* if no user is logged in mobile mode then a sign in modal will be shown */}
                      <div className="lg:hidden">
                        <SignedOut>
                          <h1 className="text-3xl font-bold text-center m-5">InstaVibe</h1>
                          <SignInButton mode='modal'>
                            <UnAuthSidebar />
                          </SignInButton>
                        </SignedOut>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
            <BottomNavBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
