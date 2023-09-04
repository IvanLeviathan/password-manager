import { Routes, Route } from 'react-router-dom'
import ProfilePage from './components/pages/ProfilePage'
import HomePage from './components/pages/HomePage'
import ProjectPage from './components/pages/ProjectPage'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/projects/:projectId" element={<ProjectPage />} />
    </Routes>
  )
}

export default Router
