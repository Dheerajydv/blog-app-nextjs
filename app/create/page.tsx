"use client"

import EditorWrapper from "@/components/EditorWrapper"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react"
import { toast } from "sonner";

const page = () => {

    //states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");

    const [loading, setLoading] = useState(false);

    //handle functions

    const handleCreatePost = async () => {
        setLoading(true);

        try {
            const response = await axios.post("/api/posts/create", { title, content });
            toast(response.data.message);

        } catch (err: any) {
            toast(err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen p-4">
            {loading ? "Creating Post......" :
                <div className="flex flex-col h-full">
                    <div className="min-h-3/4">
                        <EditorWrapper title={title} setTitle={setTitle} content={content} setContent={setContent} slug={slug} setSlug={setSlug} />
                    </div>
                    <div className="flex h-1/4 w-full justify-around items-center">
                        <Button onClick={handleCreatePost}>Create</Button>
                    </div>
                </div>}
        </div>
    )
}
export default page