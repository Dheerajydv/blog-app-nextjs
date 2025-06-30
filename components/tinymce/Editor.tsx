"use client"

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ITinyMCEPorp } from '@/types/types';


export default function App({ content, setContent }: ITinyMCEPorp) {

    const editorRef = useRef<any>(null);

    const handleOnChange = () => {
        setContent(editorRef.current.getContent());
    }

    return (
        <>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={content}
                onChange={handleOnChange}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}