"use client"

import Editor from "@/components/Editor"
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
                <>
                    <Editor title={title} setTitle={setTitle} content={content} setContent={setContent} slug={slug} setSlug={setSlug} />
                    <div><Button onClick={handleCreatePost}>Create</Button></div>
                </>}
        </div>
    )
}
export default page