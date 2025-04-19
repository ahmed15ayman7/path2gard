"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { useUserStore } from "@/lib/zustand";
type UserType = "student" | "doctor" | "ta" | "admin";
let navbarLinks = {
  student: [
    {
      name: "Dashboard",
      href: "/dashboard"
    },
    {
      name: "Track",
      href: "/track"
    },
    {
      name: "Graduation Project",
      href: "/graduation-project"
    },
    {
      name: "Recommendation",
      href: "/recommendation"
    }
  ],
  doctor: [
    {
      name: "Graduation Project",
      href: "/doctor/graduation-project"
    }
  ],
  ta: [
    {
      name: "Tracking",
      href: "/ta/tracking"
    },
    {
      name: "Graduation Project",
      href: "/ta/graduation-project"
    }
  ],
  admin: [
    {
      name: "Graduation Project",
      href: "/admin/graduation-project"
    }
  ]
}
const Navbar = ({ userType }: { userType: UserType }) => {
  const pathname = usePathname()
  const { setUserType } = useUserStore();
  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <nav className="w-full bg-[#0A2647] text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Navigation Links */}
        <div className="flex gap-6 items-center justify-center flex-grow">
          {navbarLinks[userType].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`hover:text-gray-300 relative ${isActive(link.href) ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>


        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/images/user1.jpg" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>Ahmed Ali</span>
                <span className="text-xs">AI</span>
              </div>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href="/internship" className="w-full">Internship</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href="/cv" className="w-full">Cv</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href="/requests" className="w-full">Requests</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link href="/login" onClick={() => {
                setUserType(null);
              }} className="text-red-500 w-full">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
