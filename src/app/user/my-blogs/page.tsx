'use client'
import {
    FileText,
    Plus,
    Eye,
    Clock,
    TrendingUp,
    Trash2,
    Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getUserBlogs } from "@/utils/get-user-blogs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getUserBlogs();
            setBlogs(data);
        }
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

                {/* 1. HEADER SECTION */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold tracking-tight">Command Center</h1>
                        <p className="text-muted-foreground text-sm">Monitor your insights and manage your engineering journal.</p>
                    </div>
                    <Link href="/user/write">
                        <Button className="rounded-full shadow-lg shadow-primary/20 gap-2 px-6">
                            <Plus className="w-4 h-4" /> New Insight
                        </Button>
                    </Link>
                </header>

                {/* 2. THE PULSE (METRICS) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard title="Total Insights" value="24" icon={<FileText className="w-4 h-4" />} trend="+2 this month" />
                    <MetricCard title="Total Reads" value="12.5k" icon={<Eye className="w-4 h-4" />} trend="+14% vs last week" />
                    <MetricCard title="Avg. Read Time" value="4.2m" icon={<Clock className="w-4 h-4" />} trend="Stable" />
                    <MetricCard title="Engagement" value="68%" icon={<TrendingUp className="w-4 h-4" />} trend="+5% increase" />
                </div>

                {/* 3. THE WORKBENCH (ARTICLE LIST) */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                        <h2 className="text-xl font-serif font-bold">Recent Insights</h2>
                        <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest opacity-60">View All</Button>
                    </div>

                    <div className="grid gap-4">
                        {
                            blogs.length === 0 ? (
                                <Card className="border-none bg-muted/30 shadow-none">
                                    <CardContent className="text-center py-10">
                                        <FileText className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">No insights yet. Start writing to see them here!</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                blogs.map((blog: { id: string; title: string; isPublished: boolean; createdAt: string; views: number }) => (
                                    <ArticleRow
                                        key={blog.id}
                                        title={blog.title}
                                        status={blog.isPublished ? "Published" : "Draft"}
                                        date={new Date(blog.createdAt).toLocaleDateString()}
                                    />
                                ))
                            )
                        }
                    </div>
                </section>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function MetricCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
    return (
        <Card className="border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-[10px] font-medium text-primary mt-1">{trend}</p>
            </CardContent>
        </Card>
    );
}

function ArticleRow({ title, status, date, views }: { title: string, status: "Published" | "Draft", date: string, views?: string }) {
    return (
        <div className="group flex items-center justify-between p-4 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-2 h-2 rounded-full",
                    status === "Published" ? "bg-emerald-500" : "bg-orange-500"
                )} />
                <div>
                    <h4 className="font-bold text-sm md:text-base group-hover:text-primary transition-colors cursor-pointer">{title}</h4>
                    <p className="text-xs text-muted-foreground">{date} • {status}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:block text-right">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Views</p>
                    <p className="text-sm font-mono font-bold">{views}</p>
                </div>
                <div className="flex items-center gap-1">
                    {/* EDIT BUTTON */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                        <Pencil className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                    </Button>

                    {/* DELETE BUTTON */}
                    <AlertDialog>
                        {/* 1. THE TRIGGER (Your existing button style) */}
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </AlertDialogTrigger>

                        {/* 2. THE MODAL CONTENT */}
                        <AlertDialogContent className="rounded-3xl border-border/40 shadow-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-serif text-xl">
                                    Delete this insight?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                                    This action is irreversible. The article, its metrics, and all
                                    associated metadata will be permanently purged from the system.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            {/* 3. THE ACTIONS */}
                            <AlertDialogFooter className="gap-2 mt-4">
                                <AlertDialogCancel className="rounded-full border-none bg-muted hover:bg-muted/80 font-bold text-xs uppercase tracking-widest h-10 px-6">
                                    Keep Article
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {}}
                                    className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold text-xs uppercase tracking-widest h-10 px-6"
                                >
                                    Confirm Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}

