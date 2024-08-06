import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../constants/baseUrl'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}/posts`)
      .then((response) => {
        setPosts(response.data)
        setError(null)
      })
      .catch((error) => {
        console.error(error)
        setError('Failed to load blog posts. Please try again later.')
      })
  }, [])

  const isPostNew = (createdAt) => {
    const treeHoursInMilliseconds = 3 * 60 * 60 * 1000
    const postDate = new Date(createdAt)
    const currentDate = new Date()
    return currentDate - postDate < treeHoursInMilliseconds
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Blog Posts</h1>
        <Link to="/create" className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600">
          Create Post
        </Link>
      </div>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post._id} className="mb-4 flex flex-col justify-between rounded-lg border border-gray-200 p-5 transition duration-300 hover:border-blue-400">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
                {isPostNew(post.createdAt) && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                    New
                  </span>
                )}
              </div>
              <p className="mb-4 text-gray-600">
                {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
              </p>
            </div>
            <Link to={`/posts/${post._id}`} className="mt-auto text-blue-500 hover:text-blue-700">
              Read more
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default HomePage
