import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { generateSlugFromTitle } from "../create/route";



export async function GET(request: Request, context: { params: { slug: string } }) {
    await dbConnect();

    const slug = context.params;

    if (!slug) {
        return Response.json({
            success: false,
            message: "Slug not found in params"
        }, { status: 400 })
    }

    try {
        const post = await Post.findOne({ slug });

        if (!post) {
            return Response.json({
                success: false,
                message: "Slug not found in params"
            }, { status: 400 })
        }

        return Response.json({
            success: true,
            data: post,
            message: "Post fetched sucessfully"
        }, { status: 200 })

    } catch (e) {
        console.error("Erro while creating post", e);
        return Response.json({
            success: false,
            message: "Error in Getting the post"
        }, { status: 500 });
    }

}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
    await dbConnect();

    const slug = params.slug;
    if (!slug) {
        return Response.json({
            success: false,
            message: "Slug not found in params"
        }, { status: 400 })
    }

    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
        return Response.json({
            success: false,
            message: "Login required to edit a post"
        }, { status: 401 })
    }

    try {
        const { title, content } = await request.json();

        const newSlug = generateSlugFromTitle(title);

        const post = await Post.findOneAndUpdate({ slug }, { title, content, slug: newSlug }, { new: true });

        if (!post) {
            return Response.json({
                success: false,
                message: "Cannot find post"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            data: post,
            message: "Post edited sucessfully"
        }, { status: 200 })

    } catch (e) {
        console.error("Erro while creating post", e);
        return Response.json({
            success: false,
            message: "Error in Editing the post"
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
    await dbConnect();

    const slug = params.slug;
    if (!slug) {
        return Response.json({
            success: false,
            message: "Slug not found in params"
        }, { status: 400 })
    }

    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
        return Response.json({
            success: false,
            message: "Login required to edit a post"
        }, { status: 401 })
    }

    try {
        const post = await Post.findOneAndDelete({ slug });

        if (!post) {
            return Response.json({
                success: false,
                message: "Cannot find post"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Post deleted sucessfully"
        }, { status: 200 });

    } catch (e) {
        console.error("Erro while creating post", e);
        return Response.json({
            success: false,
            message: "Error in Deleting the post"
        }, { status: 500 });
    }
}