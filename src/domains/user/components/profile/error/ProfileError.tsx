import { Button } from '@/components/ui/button'
import React from 'react'

const ProfileError = ({ refetch }: { refetch: () => void }) => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">
                Failed to load profile
            </h2>

            <p className="text-muted-foreground">
                We couldn&apos;t fetch this user&apos;s profile.
            </p>

            <Button onClick={() => refetch()}>
                Try Again
            </Button>
        </div>
    )
}

export default ProfileError