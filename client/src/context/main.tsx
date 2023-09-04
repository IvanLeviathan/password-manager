import { createContext } from 'react'

export type TTheme = 'dark' | 'light'

interface IContext {
  theme: TTheme
  changeTheme: (theme: TTheme) => void
}

const MainContext = createContext<IContext | null>(null)
export default MainContext
