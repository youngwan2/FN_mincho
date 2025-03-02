import { IoShareOutline, IoHeart, IoHeartOutline, IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useHerbBookmarkCountGetQuery } from "../../../hooks/queries/useQueryHerbBookmark";
import { useCreateHerbBookmarkMutation, useDeleteHerbBookmarkMutation } from "../../../hooks/mutations/useMutationHerbBookmark";
import { Herb } from "../../../types/herb.types";
import { useCreateHerbLikeMutation, useDeleteHerbLikeMutation } from "../../../hooks/mutations/useMutationHerbLike";
import { useCountHerbLikeGetQuery } from "../../../hooks/queries/useQueryHerbLike";


interface InteractionPanelProps {
    herb: Herb
    herbId?: string
}


export default function InteractionPanel({ herb, herbId }: InteractionPanelProps) {

    const { bookmarkMetadata } = useHerbBookmarkCountGetQuery(Number(herbId))
    const { herbLikeMetadata } = useCountHerbLikeGetQuery(Number(herbId))

    const { mutate: createBookmarkMutate } = useCreateHerbBookmarkMutation()
    const { mutate: deleteBookmarkMutate } = useDeleteHerbBookmarkMutation();

    const { mutate: createLikeMutate } = useCreateHerbLikeMutation();
    const { mutate: deleteLikeMutate } = useDeleteHerbLikeMutation();


    // 좋아요 핸들
    const handleLike = () => {
        console.log("dfdsfds" + herbLikeMetadata.isLiked)
        if (herbLikeMetadata.isLiked === false) {

            addLike()
        } else {
            cancelLike();
        }
    }

    const addLike = () => {
        createLikeMutate(Number(herbId))
    }

    const cancelLike = () => {
        deleteLikeMutate(Number(herbId))
    }



    // 북마크 핸들
    const handleBookmark = () => {
        if (bookmarkMetadata.isBookmarked === false) {
            addBookmark()

        } else {
            cancelBookmark();
        }
    }


    const cancelBookmark = () => {
        deleteBookmarkMutate(Number(herbId))
    }


    const addBookmark = () => {

        const bookmark = {
            herbName: herb.cntntsSj,
            url: window.location.href
        }

        const body = {
            bookmark,
            herbId: herb.id
        }

        createBookmarkMutate(body)

    }

    return (
        <div className="flex gap-3 p-2 mt-5 z-50">
            <button
                onClick={handleLike}
                title="좋아요"
                className={`${herbLikeMetadata.isLiked ? 'text-red-400' : 'text-black'} hover:cursor-pointer text-3xl flex items-center mr-2`}>
                {herbLikeMetadata.isLiked ? <IoHeart /> : <IoHeartOutline />}  <span>{herbLikeMetadata?.count}</span>
            </button>


            <button title="공유하기" className="hover:cursor-pointer text-3xl flex items-center mr-2"><IoShareOutline /><span>0</span> </button>

            <button
                onClick={handleBookmark}
                title="즐겨찾기"
                className={`${bookmarkMetadata.isBookmarked ? 'text-primary-green' : 'text-black'} hover:cursor-pointer text-3xl flex items-center mr-2`}>
                <IoBookmarkOutline /><span>{bookmarkMetadata?.count}</span>
            </button>
        </div>
    )
}