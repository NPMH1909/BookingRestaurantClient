import { User as UserIcon } from "lucide-react";

const CommentItem = ({ 
    comment, 
    onReplyClick, 
    replyingToId, 
    replyContent, 
    setReplyContent, 
    handleReplySubmit,
    currentVideoId 
}) => {
    const isReplying = replyingToId === comment._id;
    
    const handleSubmitReply = (e) => {
        console.log('id', comment._id)
        e.preventDefault();
        if (!replyContent.trim()) return;
                handleReplySubmit(e, currentVideoId, comment._id, replyContent);
    };
    
    return (
        <div className="ml-4 mt-4 border-l pl-4 border-gray-300">
            <div className="flex items-center">
                <UserIcon className="h-6 w-6 text-gray-500 mr-2" />
                <p className="font-semibold">{comment?.userId?.name}</p>
            </div>
            <p className="ml-8">{comment.content}</p>

            <button
                onClick={() => onReplyClick(comment._id)}
                className="text-blue-500 text-sm ml-8 hover:underline"
            >
                Phản hồi
            </button>

            {isReplying && (
                <form
                    onSubmit={handleSubmitReply}
                    className="mt-2 ml-8 flex flex-col space-y-2"
                >
                    <textarea
                        className="border p-2 rounded-lg resize-none"
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Phản hồi bình luận này..."
                    />
                    <div className="flex space-x-2">
                        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                            Gửi
                        </button>
                        <button 
                            type="button" 
                            className="text-gray-500" 
                            onClick={() => onReplyClick(null)}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}

            {/* Hiển thị các comment con */}
            {comment.children?.map(child => (
                <CommentItem
                    key={child._id}
                    comment={child}
                    onReplyClick={onReplyClick}
                    replyingToId={replyingToId}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                    handleReplySubmit={handleReplySubmit}
                    currentVideoId={currentVideoId} // Truyền xuống
                />
            ))}
        </div>
    );
};

export default CommentItem;