import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';


const EditPost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [cover, setCover] = useState('')
    const [redirect, setRedirect] = useState(false)
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        fetch(`https://anubhav-blog-backend.onrender.com/api/post/${id}`).then(response => {
            response.json().then(postdetails => {
                console.log(postdetails)
                setTitle(postdetails.data.title)
                setContent(postdetails.data.content)
                setSummary(postdetails.data.summary)
            })
        })
    }, [])

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }

        console.log(files)
        const response = await fetch('https://backend-blogs-application.onrender.com/api/post', {
            method: 'PUT',
            body: data
        })

        if (response.status == 201) {
            console.log("Post Deatils Updated Successfully!")
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />
    }
    return (
        <form onSubmit={updatePost}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <input type="summary" placeholder='Summary' value={summary} onChange={(e) => { setSummary(e.target.value) }} />
            <input type="file" onChange={e => setFiles(e.target.files)} />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px', height: '35px' }}>Update Post</button>
        </form>
    )
}

export default EditPost
