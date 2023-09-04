import { FC, useEffect, useState, useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { languageLabels } from '../../i18n/resources'
import './style.scss'
import i18next from 'i18next'
import MainContext from '../../context/main'
import { DropDirection } from 'react-bootstrap/DropdownContext'
import { useTranslation } from 'react-i18next'

interface IChangeLang {
  drop?: DropDirection
}
const ChangeLanguageComponent: FC<IChangeLang> = ({ drop = 'down' }) => {
  const [curLangObj, setCurLangObj] = useState(languageLabels[0])
  const context = useContext(MainContext)
  const { t } = useTranslation()
  useEffect(() => {
    changeCurrentLanguage(i18next.language)
  }, [])

  const changeCurrentLanguage = (newLang: string) => {
    const curLang =
      languageLabels.find((lang) => lang.value === newLang) || languageLabels[0] //default is english

    setCurLangObj(curLang)
    document.title = t('title')
    document.documentElement.setAttribute('lang', i18next.language)
  }
  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
    changeCurrentLanguage(lang)
  }

  const dropDownIcon = () => {
    return (
      <img
        className="language-icon mx-2"
        src={curLangObj.icon}
        alt={curLangObj.label}
      />
    )
  }

  return (
    <div className="languageChanger">
      <NavDropdown
        menuVariant={context?.theme}
        id="dropdown-language"
        title={dropDownIcon()}
        drop={drop}
      >
        {languageLabels.map((lang) => {
          return (
            <NavDropdown.Item
              onClick={() => changeLanguage(lang.value)}
              key={lang.value}
            >
              <img
                className="language-icon me-2"
                src={lang.icon}
                alt={lang.label}
              />
              {lang.label}{' '}
            </NavDropdown.Item>
          )
        })}
      </NavDropdown>
    </div>
  )
}

export default ChangeLanguageComponent
