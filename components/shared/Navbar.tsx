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

const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <nav className="w-full bg-[#0A2647] text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              alt="Path2Grad Logo"
              width={200}
              height={80}
              className="cursor-pointer"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link 
              href="/dashboard" 
              className={`hover:text-gray-300 relative ${isActive('/dashboard') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/track" 
              className={`hover:text-gray-300 relative ${isActive('/track') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              Track
            </Link>
            <Link 
              href="/graduation-project" 
              className={`hover:text-gray-300 relative ${isActive('/graduation-project') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              Graduation Project
            </Link>
            <Link 
              href="/recommendation" 
              className={`hover:text-gray-300 relative ${isActive('/recommendation') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-white' : ''}`}
            >
              Recommendation
            </Link>
          </div>
        </div>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/images/user1.jpg" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <span>Ahmed Ali</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/login">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar
