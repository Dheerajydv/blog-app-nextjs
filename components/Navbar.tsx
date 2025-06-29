"use client"

import { redirect } from "next/navigation"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
    const session = useSession();

    //states
    const [isLogin, setIsLogin] = useState(false);

    //handle functions
    const handleHome = () => {
        redirect("/")
    }

    const handleCreateNewPost = () => {
        redirect("/create");
    }

    const handleLogout = () => {
        signOut();
    }

    const handleSignIn = () => {
        redirect("/sign-in")
    }

    useEffect(() => {
        if (session.status !== "unauthenticated") {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }

    }, [handleLogout, handleSignIn])

    return (
        <div className="max-w-screen min-h-20 p-2 lg:flex md:flex bg-black justify-between px-4">
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button onClick={handleHome}>Home</Button>
            </div>
            <div className="text-2xl md:text-4xl lg:text-5xl italic font-extrabold  text-white flex items-center">
                BLOG APP
            </div>
            <div className="w-1/6 flex pl-2 justify-around items-center">
                {isLogin ? <>
                    <div className="flex p-1 flex-wrap items-center gap-2 md:flex-row">
                        <Button onClick={handleCreateNewPost}>Create</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:flex-row">
                        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                    </div>
                </> : <>
                    <div className="flex flex-wrap items-center gap-2 md:flex-row">
                        <Button onClick={handleSignIn}>SignIn</Button>
                    </div>
                </>}
            </div>
        </div>
    )
}
export default Navbar