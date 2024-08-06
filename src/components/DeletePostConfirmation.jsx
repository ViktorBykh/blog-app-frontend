import React, { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

function DeletePostConfirmation() {
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`)
      navigate('/')
    }
    catch (error) {
      console.error('There was an error deleting the post!', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Delete Post</h1>
      <p className="mb-3">Are you sure you want to delete this post?</p>
      <button
        onClick={handleDelete}
        className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="rounded bg-gray-500 px-4 py-2 text-white"
      >
        Cancel
      </button>
    </div>
  )
}

export default DeletePostConfirmation
