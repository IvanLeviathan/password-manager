import { FC, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { languageLabels } from '../../i18n/resources'
import './style.scss'
import i18next from 'i18next'

interface IChangeLang {}
const ChangeLanguageComponent: FC<IChangeLang> = () => {
  const [curLangObj, setCurLangObj] = useState(languageLabels[0])

  useEffect(() => {
    changeCurrentLanguage(i18next.language)
  }, [])

  const changeCurrentLanguage = (newLang: string) => {
    const curLang =
      languageLabels.find((lang) => lang.value === newLang) || languageLabels[0] //default is english

    setCurLangObj(curLang)
  }
  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang)
    changeCurrentLanguage(lang)
  }

  const dropDownIcon = () => {
    return (
      <img
        className="language-icon me-2"
        src={curLangObj.icon}
        alt={curLangObj.label}
      />
    )
  }

  return (
    <div className="languageChanger">
      <NavDropdown
        menuVariant="dark"
        id="dropdown-language"
        title={dropDownIcon()}
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
