// interface DetailFooterProps { }

import CommentHeader from "./comment/CommentHeader";
import CommentWriteForm from "./comment/CommentWriteForm";
import DetailComment from "./DetailComment";


export default function DetailFooter() {
    return (
        <div>
            <DetailComment>
                <CommentHeader/>
                <CommentWriteForm/>
                
                {/* 댓글 리스트> 대댓글 */}

            </DetailComment>
        </div>
    )
}