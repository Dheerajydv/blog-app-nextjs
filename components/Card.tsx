import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ICardProp } from "@/types/types"
import { redirect } from "next/navigation"


const CardComp = ({ title, slug, content, createdAt }: ICardProp) => {

    const handleViewPost = async () => {
        redirect(`/view/${slug}`)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Created At: {createdAt?.slice(0, 10)}
                </CardDescription>
                <CardAction>
                    <Button onClick={handleViewPost} variant="link">View</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <div dangerouslySetInnerHTML={{ __html: content.slice(0, 500) }}></div>
            </CardContent>
        </Card>
    )
}
export default CardComp