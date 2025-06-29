"use client"

import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import githubImg from "../../public/github-mark.png"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

const page = () => {
    const session = useSession();
    const [isLogin, setIsLogin] = useState(false);

    const handleGithubSignIn = () => {
        signIn("github");
    }

    useEffect(() => {
        if (session.status !== "unauthenticated" && session.status !== "loading") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    })

    useEffect(() => {
        if (isLogin) {
            redirect("/");
        }
        console.log(isLogin)
    }, [setIsLogin, isLogin])

    return (
        <div className="flex flex-wrap justify-center h-screen items-center gap-2 md:flex-row">
            <div className="flex justify-around items-center">
                <Image src={githubImg} width={80} height={80} alt="Github" />
                <Button onClick={handleGithubSignIn}>Signin with github</Button>
            </div>
        </div>
    )
}
export default page