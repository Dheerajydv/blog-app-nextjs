import { dbConnect } from "@/lib/dbConnect";
import Post from "@/models/Blog";
import { getServerSession, User as UserType } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import Admin from "@/models/Admin";
import generateSlugFromTitle from "@/lib/generateSlugFromTitle";

export async function POST(request: Request) {
    await dbConnect();

    try {

        const session = await getServerSession(authOptions);
        const user: UserType = session?.user as UserType;

        if (!session || !session?.user) {
            return Response.json({
                success: false,
                message: "Login to create a post"
            }, { status: 401 })
        }

        const userEmail = user.email;


        const { title, content } = await request.json();

        if (!title || !content) {
            return Response.json({
                success: false,
                message: "Post should contail both title and content"
            }, { status: 400 });
        }

        const slug = generateSlugFromTitle(title);

        if (!slug) {
            return Response.json({
                success: false,
                message: "Some error occured while generating slug for this post title"
            }, { status: 500 });
        }

        const postWithSlugAlreadyExists = await Post.findOne({ slug });
        if (postWithSlugAlreadyExists) {
            return Response.json({
                success: false,
                message: "Title already taken"
            }, { status: 400 });
        }

        const post = new Post({ title, content, slug })
        await post.save();

        await Admin.findOneAndUpdate({ email: userEmail }, { $push: { posts: post } });

        return Response.json({
            success: true,
            message: "Post created sucessfully"
        }, { status: 201 });

    } catch (e) {
        console.error("Erro while creating post", e);
        return Response.json({
            success: false,
            message: "Error in creating post"
        }, { status: 500 });
    }

}