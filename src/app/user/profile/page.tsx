"use client"

import { useEffect, useState } from 'react'
import { getMe } from '@/utils/me'
import { IUser } from '@/models/user_models/user.model'
import {
  ShieldCheck,
  Mail,
  Calendar,
  Camera,
  LogOut,
  KeyRound
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

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
    <div className="min-h-screen bg-background selection:bg-primary/10">
      {/* SIMPLE MINIMAL BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">

          {/* LEFT COLUMN: IDENTITY STICKY */}
          <aside className="lg:sticky lg:top-32 space-y-8">
            <div className="relative inline-block group">
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden bg-muted border border-border shadow-sm">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    fill
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted text-3xl font-serif text-muted-foreground">
                    {user?.username?.charAt(0)}
                  </div>
                )}
              </div>
              <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 rounded-xl h-9 w-9 border shadow-sm">
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight">{user?.username}</h1>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{user?.email}</p>
              </div>

              {user?.isVerified && (
                <Badge variant="outline" className="rounded-full px-3 py-1 gap-1.5 border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </Badge>
              )}

              <div className="pt-4 space-y-2">
                <Button className="w-full rounded-xl h-10 font-bold text-xs uppercase tracking-widest" size="sm">
                  Edit Profile
                </Button>
                <Button variant="ghost" className="w-full rounded-xl h-10 font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive" size="sm">
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: SYSTEM CONFIGURATION */}
          <section className="space-y-12">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8 mb-8">
                <TabsTrigger value="account" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-xs font-bold uppercase tracking-widest">
                  Account
                </TabsTrigger>
                <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-xs font-bold uppercase tracking-widest">
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-10 mt-0 outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                  <SystemInfo
                    icon={<Mail className="w-4 h-4" />}
                    label="Primary Email"
                    value={user?.email || 'N/A'}
                  />
                  <SystemInfo
                    icon={<Calendar className="w-4 h-4" />}
                    label="Genesis Date"
                    value="March 2026"
                  />
                </div>

                <div className="pt-6">
                  <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verification Status</p>
                      <p className="text-sm font-bold">Your developer identity is confirmed.</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="mt-0 outline-none space-y-6">
                <div className="p-1 border rounded-2xl">
                  <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-xl cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="font-bold text-[10px] uppercase tracking-widest">Enable</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </section>

        </div>
      </main>
    </div>
  )
}

function SystemInfo({ icon, label, value, mono }: { icon: React.ReactNode, label: string, value: string, mono?: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground opacity-70">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className={`text-base font-bold ${mono ? 'font-mono text-sm' : ''}`}>{value}</p>
    </div>
  )
}

export default ProfilePage