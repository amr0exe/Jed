import Navbar from "@/layout/Navbar";
import edjsHTML from "editorjs-html";
import { useBlog, useCreateComment } from "@/hooks";
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Feed() {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const { loading, blog, comments, refetchComments } = useBlog({ id: id || "" });
    const { createComment, commentLoading } = useCreateComment();

    const handleSubmit = useCallback(() => {
        if (comment.trim()) {
            createComment({
                id: Number(id),
                content: comment,
                onSuccess: refetchComments, // Call refetchComments on success
            });
            setComment(""); // Clear the input after submission
        }
    }, [comment, id, createComment, refetchComments]);

    if (loading || !blog) {
        return (
            <div>
                <p className="text-5xl font-semibold w-24 mt-52 mx-auto text-slate-600">Loading</p>
            </div>
        );
    }

    const author = blog["author"];
    const edjsParser = edjsHTML();
    const htmlArray = edjsParser.parse(blog["content"]); // since editorjs-data is saved as array of block
    const htmlContent = htmlArray.join("");

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Navbar />

            <div className="bg-slate-100">
                <div className="text-black font-mono flex justify-between w-2/3 mx-auto pt-10 pb-10 border-slate-400 border-b">
                    <div className="flex items-center">
                        <Avatar className="border border-gray-300 text-xl">
                            <AvatarImage src="#"></AvatarImage>
                            <AvatarFallback>{author["username"][0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex">
                            <p className="text-lg font-semibold ml-2">{author["username"]}
                                <sup className="text-xs text-slate-500 tracking-tighter font-extralight">Follow</sup>
                            </p>
                            {/* <p className="tracking-tighter text-xs font-extralight text-slate-600 ml-1">
                                Follow
                            </p> */}
                        </div>
                    </div>
                </div>

                {/* <div className="border-slate-300 border-b border-t w-2/3 mx-auto flex justify-between items-center">
                    <div className="flex py-2 items-center gap-1">
                        <Heart size={16} color="#616161" strokeWidth={0.5} />
                        <p className="text-xs text-slate-700 tracking-tighter">130</p>
                    </div>
                    <div className="flex gap-2">
                        <Bookmark size={16} color="#616161" strokeWidth={1} />
                        <SquareArrowOutUpRight size={16} color="#616161" strokeWidth={1.75} />
                        <Ellipsis size={16} color="#616161" strokeWidth={1.5} />
                    </div>
                </div> */}

                <div className="decentfix mx-auto font-mono h-[90vh] w-2/3">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
                </div>

                <div className="border-slate-400 border-b w-2/3 mx-auto flex justify-between items-center">
                    <p className="font-mono text-xl font-semibold">Comments</p>
                </div>

                <div className="w-2/3 mx-auto">
                    <div className="w-full flex justify-center items-baseline gap-3">
                        <input
                            type="text"
                            className="w-2/3 h-10 mt-3 pl-3 rounded-sm outline-none"
                            placeholder="create comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button size={"sm"} onClick={handleSubmit}>
                            {commentLoading ? "..." : "Submit"}
                        </Button>
                    </div>

                    {comments?.length > 0 ? (
                        comments.map((now) => (
                            <CommmentCard
                                id={now.id}
                                username={now.user.username}
                                content={now.content}
                            />
                        ))
                    ) : (
                        <p className="text-center mt-5 font-mono font-semibold">No Comments available!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Feed;

function CommmentCard({ id, username, content }: { id: number; username: string; content: string }) {
    return (
        <div className="flex items-center pt-6" key={id}>
            <Avatar className="border border-gray-300 text-xl">
                <AvatarImage src="#"></AvatarImage>
                <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col ml-2">
                <div className="flex items-center font-mono">
                    <p className="text-base font-semibold">{username}</p>
                    <p className="tracking-tighter text-xs font-extralight text-slate-600 ml-1">
                       <sup>Follow</sup> 
                    </p>
                </div>
                <p className="text-sm font-semibold text-slate-500">{content}</p>
            </div>
        </div>
    );
}
