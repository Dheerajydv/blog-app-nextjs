"use client"

import { Button } from "@/components/ui/button";
import { IPostData } from "@/types/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner"


const page = () => {

    const session = useSession();
    const params = useParams<{ slug: string }>();
    const slug = params.slug;

    //states
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState<IPostData>({
        title: "",
        content: "",
        createdAt: ""
    });

    const handleDeletePost = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`/api/posts/${slug}`);
            toast(response.data?.message)
        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    const handleEditPost = () => {
        redirect(`/edit/${slug}`);
    }

    const fetchPost = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/posts/${slug}`);
            // toast(response.data.message);
            setPostData(response.data?.data);
            // const parsedData = moment(response.data.data?.createdAt);
            // const formattedDate = parsedData.format("MMM DD, YYYY");
            // setPostData({ ...postData, createdAt: formattedDate });
        } catch (err: any) {
            toast(err.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session.status !== "unauthenticated" && session.status !== "loading") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }

        fetchPost();
    }, [isLogin, setIsLogin])


    return (
        <div className="flex flex-col min-h-screen w-screen p-4">
            {loading ? "Loading...." : (
                <>
                    <h1 className="text-5xl font-extrabold text-center">{postData.title}</h1>
                    <div className="flex justify-between items-center">
                        <p className="font-bold">Created At: {postData.createdAt?.slice(0, 10)}</p>
                        {
                            isLogin &&
                            <div className="flex flex-wrap items-center gap-2 md:flex-row">
                                <Button className="cursor-pointer" onClick={handleEditPost} >Edit</Button>
                                <Button className="cursor-pointer" onClick={handleDeletePost} variant="destructive">Delete</Button>
                            </div>
                        }
                    </div>
                    <span className="text-black">
                        {postData.content}
                    </span>
                </>
            )}
        </div>
    )
}
export default page