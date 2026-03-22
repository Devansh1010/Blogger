"use client"

import { useEffect, useState } from 'react'
import { getMe } from '@/utils/me'
import { IUser } from '@/models/user_models/user.model'
import {
  ShieldCheck,
  ShieldAlert,
  Mail,
  Calendar,
  Camera,
  LogOut,
  KeyRound,
  User as UserIcon,
  ChevronRight,
  Settings2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe()
        setUser(data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* 1. MINIMAL HEADER CANVAS */}
      <div className="h-48 w-full bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800/50" />

      <main className="max-w-3xl mx-auto px-6 -mt-16 pb-32">
        {/* 2. IDENTITY AREA */}
        <section className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="relative group">
            <div className="h-32 w-32 rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 border-[6px] border-white dark:border-zinc-950 shadow-xl ring-1 ring-zinc-200/50 dark:ring-zinc-800">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.username} fill className="object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-3xl font-serif bg-zinc-50 dark:bg-zinc-900 text-zinc-400">
                  {user?.username?.charAt(0)}
                </div>
              )}
            </div>
            <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-9 w-9 rounded-2xl shadow-lg border-2 border-white dark:border-zinc-950 hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl font-serif font-bold tracking-tight">{user?.username}</h1>
              {user?.isVerified ? (
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-none rounded-full px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="h-7 rounded-full text-[10px] font-bold uppercase tracking-widest border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                  <ShieldAlert className="w-3 h-3 mr-1" /> Verify
                </Button>
              )}
            </div>
            <p className="text-zinc-500 font-medium">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button className="rounded-2xl px-8 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/10">
              Edit Profile
            </Button>
            <Button variant="outline" size="icon" className="rounded-2xl text-zinc-400 hover:text-destructive transition-colors border-zinc-200 dark:border-zinc-800">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* 3. INFORMATION GRID (FORMERLY ACCOUNT TAB) */}
        <div className="space-y-12">
          <SectionHeader title="Account Details" description="Your public identity and system credentials." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 px-2">
            <ProfileItem icon={<UserIcon />} label="Display Name" value={user?.username} />
            <ProfileItem icon={<Mail />} label="Primary Email" value={user?.email} />
            <ProfileItem icon={<Calendar />} label="Genesis Date" value="March 2026" />
            <ProfileItem icon={<Settings2 />} label="Account Type" value="Developer" />
          </div>

          <Separator className="bg-zinc-100 dark:bg-zinc-800/50" />

          {/* 4. SECURITY ACTIONS (FORMERLY SECURITY TAB) */}
          <SectionHeader title="Security & Access" description="Manage your authentication and protection layers." />

          <div className="space-y-5 px-1">
            <div>
              <SecurityCard
                icon={<KeyRound />}
                title="Password Management"
                desc="Update your security key regularly"
                href="/auth/forgot-password"
              />
            </div>

            <div>
              <SecurityCard
                icon={<ShieldCheck />}
                title="Two-Factor Authentication"
                desc="Add an extra layer of protection"
                disabled
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">{title}</h2>
      <p className="text-xs text-zinc-500">{description}</p>
    </div>
  )
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 text-zinc-400">
        <span className="scale-75 origin-left opacity-70">{icon}</span>
        <span className="text-[10px] font-black uppercase tracking-[0.25em]">{label}</span>
      </div>
      <p className="text-base font-bold pl-0.5">{value || "—"}</p>
    </div>
  )
}

function SecurityCard({ icon, title, desc, href, disabled }: { icon: React.ReactNode, title: string, desc: string, href?: string, disabled?: boolean }) {
  const Content = (
    <div className={`group flex items-center justify-between p-5 rounded-[1.5rem] border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all ${!disabled && 'hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md hover:border-zinc-200 dark:hover:border-zinc-800'}`}>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
          <span className="text-zinc-900 dark:text-zinc-100 scale-90">{icon}</span>
        </div>
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="text-[11px] text-zinc-500 font-medium">{desc}</p>
        </div>
      </div>
      {!disabled ? (
        <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      ) : (
        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest opacity-40 border-zinc-300">Enabled</Badge>
      )}
    </div>
  )

  if (href && !disabled) return <Link href={href}>{Content}</Link>
  return Content
}

export default ProfilePage