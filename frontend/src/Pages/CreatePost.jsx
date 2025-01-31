import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

    const CreateNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();
        console.log(files)
        const response = await fetch('https://anubhav-blog-backend.onrender.com/api/post', {
            method: 'POST',
            body: data
        })
        if (response.status == 201) {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={CreateNewPost}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <input type="summary" placeholder='Summary' value={summary} onChange={(e) => { setSummary(e.target.value) }} />
            <input type="file" onChange={e => setFiles(e.target.files)} />
            {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px', height: '35px' }}>Create New Post</button>
        </form>
    )
}

export default CreatePost