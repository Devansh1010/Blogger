import Profile from '@/domains/user/components/profile/Profile'
import React from 'react'

interface profilePageProps {
    params: Promise<{ userId: string }>
}

const page = async ({ params }: profilePageProps) => {
    const { userId } = await params
    
    return (
        <Profile
            userId={userId}
        />
    )
}

export default page