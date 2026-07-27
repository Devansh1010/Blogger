'use client'

import Overview from './_components/Overview'

const Profile = ({ userId }: { userId: string }) => {


    return (
        <div>
            <Overview userId={userId} />
        </div>
    )
}

export default Profile