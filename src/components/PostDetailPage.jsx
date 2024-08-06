import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../constants/baseUrl'

function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/posts/${id}`)
        setPost(response.data)
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

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (!post) {
    return <div className="container mx-auto p-6">No post found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">{post.title}</h1>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <div className="
              mx-auto max-w-lg rounded-lg border
              border-gray-200 p-5 transition
              duration-300 hover:border-blue-100"
      >
        <div className="mb-14">
          <p className="mb-4 text-lg font-semibold leading-relaxed text-gray-600">{post.content}</p>
          <p className="mb-4 text-lg font-semibold text-gray-400">
            <span className="font-bold text-gray-600">Author:</span>
            {' '}
            {post.author}
          </p>
          <p className="mb-4 text-lg font-semibold text-gray-400">
            <span className="font-bold text-gray-600">Created At:</span>
            {' '}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex justify-center gap-7">
          <Link
            to={`/edit/${post._id}`}
            className="rounded bg-yellow-500 px-4 py-2 text-white transition duration-300 hover:bg-yellow-600"
          >
            Edit Post
          </Link>
          <Link
            to={`/delete/${post._id}`}
            className="rounded bg-red-500 px-4 py-2 text-white transition duration-300 hover:bg-red-600"
          >
            Delete Post
          </Link>
          <Link
            to="/"
            className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostDetailPage
