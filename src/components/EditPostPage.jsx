import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

function EditPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/posts/${id}`)
        setTitle(response.data.title)
        setContent(response.data.content)
        setAuthor(response.data.author)
      }
      catch (error) {
        setError('There was an error fetching the post!')
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await axios.put(`${BASE_URL}/posts/${id}`, { title, content, author })
      navigate(`/posts/${id}`)
    }
    catch (error) {
      setError('There was an error updating the post!')
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">Edit Post</h1>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="
          mx-auto max-w-lg rounded-lg border
          border-gray-200 p-5 transition
          duration-300 hover:border-blue-100"
      >
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  )
}

export default EditPostPage
