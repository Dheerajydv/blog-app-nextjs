"use client"

import { redirect } from "next/navigation"
import { Button } from "./ui/button"

const Navbar = () => {
    const handleHome = () => {
        redirect("/view/all")
    }

    return (
        <div className="w-screen h-20 flex justify-between px-4 bg-gray-950">
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button onClick={handleHome} >Home</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:flex-row">
                <Button variant="outline">Button</Button>
            </div>
        </div>
    )
}
export default Navbar