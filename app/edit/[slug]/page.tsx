"use client"

import Editor from "@/components/Editor"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";


const page = () => {
    const params = useParams<{ slug: string }>();
    const slug = params.slug;

    //states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [slugValue, setSlugValue] = useState("");

    const [loading, setLoading] = useState(false);

    //handle functions
    const handleEditPost = async () => {
        setLoading(true);

        try {
            const response = await axios.put(`/api/posts/${slug}`, { title, content });
            toast(response.data.message);

        } catch (err: any) {
            toast(err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchPostData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/posts/${slug}`);
            setTitle(response.data?.data.title);
            setContent(response.data?.data.content);

        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setSlugValue(slug);
        fetchPostData();
    }, [])

    return (
        <div className="h-screen w-screen p-4">
            {loading ? "Editing Post......" :
                <div className="flex flex-col h-full">
                    <div className="min-h-3/4">
                        <Editor title={title} setTitle={setTitle} content={content} setContent={setContent} slug={slugValue} setSlug={setSlugValue} />
                    </div>
                    <div className="flex h-1/4 w-full justify-around items-center">
                        <Button onClick={handleEditPost}>Edit</Button>
                        <Button variant="destructive" onClick={() => { redirect("/view/all") }}>Cancel</Button>
                    </div>
                </div>}
        </div>
    )
}
export default page