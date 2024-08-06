import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import PostDetailPage from './components/PostDetailPage'
import CreatePostPage from './components/CreatePostPage'
import EditPostPage from './components/EditPostPage'
import DeletePostConfirmation from './components/DeletePostConfirmation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/edit/:id" element={<EditPostPage />} />
      <Route path="/delete/:id" element={<DeletePostConfirmation />} />
    </Routes>
  )
}

export default App
