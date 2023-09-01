import { FC, useContext } from 'react'
import './style.scss'
import MainContext from '../../context/main'
import { Alert } from 'react-bootstrap'
import './style.scss'

interface IAlerts {}
const AlertsComponent: FC<IAlerts> = () => {
  const context = useContext(MainContext)
  return (
    <div className="alerts-wrapper">
      {context?.alerts.map((alert) => {
        return (
          <Alert variant={alert.type} dismissible key={alert.id}>
            <p>{alert.text}</p>
          </Alert>
        )
      })}
    </div>
  )
}

export default AlertsComponent
