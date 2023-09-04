import { useEffect, useState } from 'react'
import './App.scss'
import AlertsComponent from './components/alerts'
import AuthComponent from './components/auth'
import MainContext, { TTheme } from './context/main'
import './i18n'
import MainPages from './components/pages'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { useActions } from './hooks/useActions'
import { Spinner } from 'react-bootstrap'

function App() {
  const [curTheme, setCurTheme] = useState<TTheme>('dark')

  const { error, loading, user } = useTypedSelector((state) => state.user)
  const { fetchUser, refetchUser, addAlert } = useActions()
  const { t } = useTranslation()

  useEffect(() => {
    if (localStorage.getItem('jwt')) fetchUser()
  }, [])

  useEffect(() => {
    if (!user) return
    const interval = setInterval(function () {
      refetchUser()
    }, 10 * 1000)
    return () => clearInterval(interval)
  }, [user, refetchUser])

  useEffect(() => {
    if (!error) return
    addAlert({
      text: t(`apiAnswers.${error.message}`),
      type: 'danger',
    })
  }, [error, loading])

  if (loading) {
    return (
      <div className="main-preloader">
        <Spinner animation="border" />
      </div>
    )
  }

  const changeTheme = (theme: TTheme) => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    setCurTheme(theme)
  }

  return (
    <MainContext.Provider
      value={{
        theme: curTheme,
        changeTheme,
      }}
    >
      <div className="bg-body-tertiary">
        {!user ? <AuthComponent /> : <MainPages />}

        <AlertsComponent />
      </div>
    </MainContext.Provider>
  )
}

export default App
