import noImage from '@/assets/noImage.png'
import Skeleton from 'react-loading-skeleton'

export default function AvatarContainer({ avatarUrl = '', isLoading }: { avatarUrl?: string, isLoading?: boolean }) {


    if (isLoading) {
        return (
            <div className='relative h-20 w-20 rounded-full overflow-hidden'>
                <Skeleton circle width={50} height={50} />
            </div>
        )
    }

    return (
        <div className="relative h-20 w-20 rounded-full overflow-hidden">
            <img className="w-20 h-20" src={avatarUrl || noImage} alt="Profile" onError={(e) => { e.currentTarget.src = noImage }} />
        </div>
    )
}