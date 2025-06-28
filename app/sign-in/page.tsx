"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

const page = () => {

    const handleGithubSignIn = () => {
        signIn("github");
    }

    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button onClick={handleGithubSignIn}>Signin with github</Button>
        </div>
    )
}
export default page