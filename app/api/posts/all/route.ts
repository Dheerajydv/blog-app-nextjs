import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Blog";

export async function GET() {
    dbConnect();

    try {
        const allPosts = await Post.find();
        if (!allPosts) {
            return Response.json({
                success: false,
                message: "Posts not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            data: allPosts,
            message: "All posts fetched"
        }, { status: 200 });

    } catch (e) {
        console.error("Erro while getting all post", e);
        return Response.json({
            success: false,
            message: "Error in getting all post"
        }, { status: 500 });
    }

}