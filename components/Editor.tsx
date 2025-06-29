"use client"

import React, { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export interface IEditorProps {
    title: string;
    content: string;
    slug: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    setSlug: React.Dispatch<React.SetStateAction<string>>;
}


const Editor = ({ title, setTitle, content, setContent, slug, setSlug }: IEditorProps) => {

    const [frontSlug, setFrontSlug] = useState("");

    const generateSlugFromTitle = useCallback(
        (title: string): string => {
            let generatedSlug = title.toLowerCase();
            generatedSlug = generatedSlug
                .normalize("NFD") // Normalize the string to decomposed form
                .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics (combining diacritical marks)
            generatedSlug = generatedSlug.replace(/[^a-z0-9\s-]/g, "");
            generatedSlug = generatedSlug.replace(/[\s_]+/g, "-");
            generatedSlug = generatedSlug.replace(/^-+|-+$/g, "");
            return generatedSlug;
        }, [])

    useEffect(() => {
        setFrontSlug(generateSlugFromTitle(title));
    })

    return (
        <div className="w-full h-full flex flex-col">
            <label htmlFor="title">Title</label>
            <Input id="title" type="text" placeholder="Title" value={title} onChange={
                (e) => { setTitle(e.target.value) }
            }
            />
            <label htmlFor="slug">Slug</label>
            <Input id="slug" type="text" placeholder="Slug: Auto Generated" value={frontSlug} readOnly />
            <label htmlFor="content">Content</label>
            <Textarea id="content" placeholder="Your MAIN Content" value={content} onChange={
                (e) => { setContent(e.target.value) }
            } />
        </div>
    )
}
export default Editor