import { FC } from 'react'
import './style.scss'
import { Alert } from 'react-bootstrap'
import './style.scss'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface IAlerts {}
const AlertsComponent: FC<IAlerts> = () => {
  const { alerts } = useTypedSelector((state) => state.alerts)

  return (
    <div className="alerts-wrapper">
      {alerts.map((alert) => {
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
