import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/home'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={123} />
      <Route path="/projects/:projectId" element={321} />
    </Routes>
  )
}

export default Router
