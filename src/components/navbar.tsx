"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./theme"
import { useSession } from "next-auth/react"

export function Navbar() {

    const { data: session } = useSession()

    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()


    const [scrolled, setScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Explore", href: "/user/explore" },
        { name: "My Blogs", href: "/user/my-blogs" },
        { name: "My Series", href: "/user/series" },
        { name: "Profile", href: `/user/profile/${session?.user?._id}` },
    ]

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b",
            scrolled
                ? "bg-background/80 backdrop-blur-xl border-border py-3"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* LOGO SECTION */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="font-serif text-lg font-bold tracking-tighter sm:text-xl">
                        Insights<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-4 w-px bg-border mx-2" />


                    {
                        session?.user ? (
                            <Link href="/write-blog">
                                <Button variant="outline" size="sm">
                                    Write a Story
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/auth/signin">
                                <Button size="sm" className="rounded-full px-5 font-bold text-xs uppercase tracking-widest">
                                    Sign In
                                </Button>
                            </Link>
                        )
                    }


                    {/* Theme Toggle */}
                    <div className="">
                        <ModeToggle />
                    </div>
                </div>

                {/* MOBILE TOGGLE */}
                <div className="md:hidden flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full border-b border-border bg-background shadow-lg animate-in slide-in-from-top-2 duration-300 md:hidden">
                    <div className="flex max-h-[calc(100vh-70px)] flex-col overflow-y-auto p-6">

                        {/* Navigation */}
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                                        pathname === link.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="my-5 border-t" />

                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-medium text-muted-foreground">
                                Theme
                            </span>

                            <ModeToggle />
                        </div>

                        <div className="my-5 border-t" />

                        {/* Authentication */}
                        {session?.user ? (
                            <Link
                                href="/write-blog"
                                onClick={() => setIsOpen(false)}
                            >
                                <Button className="w-full rounded-xl">
                                    Write a Story
                                </Button>
                            </Link>
                        ) : (
                            <Link
                                href="/auth/signin"
                                onClick={() => setIsOpen(false)}
                            >
                                <Button className="w-full rounded-xl">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav >
    )
}