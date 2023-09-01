import { useEffect, useState } from 'react'
import './App.scss'
import AlertsComponent from './components/alerts'
import AuthComponent from './components/auth'
import MainContext, { IAlert, IUser } from './context/main'
import './i18n'
import apiRequest from './utils/apiRequest'
import MainPages from './components/pages'

function App() {
  const [alerts, setAlerts] = useState<IAlert[]>([])
  const [user, setUser] = useState<IUser | null>(null)

  const addAlert = (alert: IAlert) => {
    alert.id = new Date().getTime().toString()
    if (alert.status)
      alert.type =
        alert.status >= 200 && alert.status <= 299 ? 'success' : 'danger'
    setAlerts((current) => [...current, alert])
    if (alert.id) removeAlert(alert.id, 5 * 1000)
  }

  const removeAlert = (alertId: string, delay: number = 5 * 1000) => {
    setTimeout(function () {
      setAlerts((current) => {
        const newCurrent = current.filter((alert) => alert.id !== alertId)
        return newCurrent
      })
    }, delay)
  }

  const getUser = async () => {
    const res = await apiRequest(
      '/users/',
      'GET',
      {},
      { 'x-auth-token': localStorage.getItem('jwt') },
    )
    if (res.status === 200) setUser(res.data)
    else setUser(null)
  }

  useEffect(() => {
    getUser()
    setInterval(function () {
      getUser()
    }, 10 * 1000)
  }, [])

  return (
    <MainContext.Provider
      value={{ alerts: alerts, addAlert, removeAlert, getUser, user }}
    >
      <div className="bg-body-tertiary">
        {!user ? <AuthComponent /> : <MainPages />}

        <AlertsComponent />
      </div>
    </MainContext.Provider>
  )
}

export default App
