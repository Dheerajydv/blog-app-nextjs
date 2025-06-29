"use client"

import CardComp from "@/components/Card"
import { IPostData } from "@/types/types";
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner";

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPostData, setAllPostData] = useState<IPostData[]>([])

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/posts/all");
      setAllPostData(response.data?.data);

    } catch (err: any) {
      toast(err.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPosts();
  }, [])

  return (
    <div className="p-4 gap-4 flex flex-wrap min-h-screen max-w-screen">
      {loading ? "Loading Posts......." : (allPostData.map((post) => (
        <CardComp key={post.title} slug={post.slug} title={post.title} content={post.content} createdAt={post.createdAt} />
      )))}
    </div>
  )
}
export default Home