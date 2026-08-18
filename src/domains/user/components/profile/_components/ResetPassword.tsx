'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { forgotPassword } from '@/utils/forgot-password'

const ResetPassword = ({ email }: { email?: string }) => {
    const [isPending, setIsPending] = useState(false)

    const handleReset = async () => {
        if (!email) {
            toast.error('Email is not available for this account.')
            return
        }

        setIsPending(true)

        try {
            await forgotPassword(email)
            toast.success('A password reset link has been sent to your email.')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unable to send reset link.')
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-lg font-medium"
                >
                    <KeyRound className="size-3.5" />
                    Reset Password
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader className="space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                    </div>

                    <div>
                        <DialogTitle className="text-left">Reset your password</DialogTitle>
                        <DialogDescription className="mt-2 text-left">
                            We will send a secure reset link to {email || 'your email address'}.
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        disabled={isPending || !email}
                        className="gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <KeyRound className="h-4 w-4" />
                                Send reset link
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ResetPassword
