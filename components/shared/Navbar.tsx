import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
//   import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { ModeToggle } from "./ModeToggle";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ProfileDropdown } from "./ProfileDropdown";
import { PackageIcon } from "lucide-react";
import { Menu } from 'lucide-react';


export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 sticky top-0 z-10 bg-white dark:bg-gray-950">
      {/* Mobile Navigation Menu */}
      <div className="flex w-full lg:w-0 items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Jazzee Market</SheetTitle>
            </SheetHeader>
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
              {/* <MountainIcon className="h-6 w-6" /> */}
              {/* <div className="text-xl bg-red-300">Acme Inc</div> */}
              <span className="sr-only">Jazzee Market</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                href="/"
                className="flex w-full items-center py-2 text-base"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/profile"
                className="flex w-full items-center py-2 text-base"
                prefetch={false}
              >
                Profile
              </Link>
              <Link
                href="/products"
                className="flex w-full items-center py-2 text-base"
                prefetch={false}
              >
                Products
              </Link>
              <Link
                href={"/requests"}
                className="flex w-full items-center py-2 text-base"
                prefetch={false}
              >
                Requests
              </Link>
              <Link
                href={user ? "/create-auction" : "/api/auth/login"}
                className="flex w-full items-center py-2 text-base"
                prefetch={false}
              >
                Create Auction
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-3 lg:hidden">
          {user ? (
            <ProfileDropdown
              picture={
                user?.picture ||
                "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
              }
            />
          ) : (
            <Button asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
          )}
          {/* <ModeToggle /> */}
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <Link
        href="/"
        className="mr-6 hidden lg:flex items-center justify-center"
        prefetch={false}
      >
        {/* <Image src={logoLight} alt="Vault IIT BBS" width={150}  /> */}

        <PackageIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Jazzee Market</span>
        {/* <Vault IIT BBSLogo /> */}
        {/* <Badge className="mx-2 h-8">BETA</Badge> */}
        <span className="sr-only">Jazzee Market</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 lg:items-center">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/products"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Products
        </Link>
        <Link
          href={user ? "/create-auction" : "/api/auth/login"}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Create Auction
        </Link>
        <Link
          href={'/dashboard'}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Dashboard
        </Link>
        <Link
          href={'/auction-results'}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Results
        </Link>
        <Link
          href={"/my-auctions"}
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          My Auctions
        </Link>

        {user ? (
          <ProfileDropdown
            picture={
              user?.picture ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
            }
          />
        ) : (
          <Button asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
        )}
        {/* <ModeToggle /> */}
      </nav>
    </header>
  );
}
