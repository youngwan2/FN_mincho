interface MypageProfileImageProps {
    profileImage: string
}

export default function MypageProfileImage({ profileImage }: MypageProfileImageProps) {
    return (
        <div className="w-full flex justify-center">
            <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <img src={profileImage || "https://picsum.photos/800/600"} className="w-full h-full bg-gray-400 rounded-full"></img>
            </div>
        </div>
    )
}