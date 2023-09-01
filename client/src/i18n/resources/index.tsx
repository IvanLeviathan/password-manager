import en from './en/translation'
import ru from './ru/translation'

import ruIcon from '../../assets/images/languageIcons/ru.png'
import enIcon from '../../assets/images/languageIcons/en.png'

export const resources = {
  en,
  'ru-RU': ru,
}

export const languageLabels = [
  { value: 'en', label: 'English', icon: enIcon },
  { value: 'ru-RU', label: 'Русский', icon: ruIcon },
]
