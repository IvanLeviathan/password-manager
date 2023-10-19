const ru = {
  translation: {
    title: 'Менеджер паролей',
    authPage: {
      auth: 'Авторизация',
      login: 'Логин',
      loginPlaceholder: 'Введите логин',
      email: 'Email',
      emailPlaceholder: 'Введите email',
      password: 'Пароль',
      passwordPlaceholder: 'Введите пароль',
      submit: 'Вход',
      noAccount: 'Нет аккаунта?',
      register: 'Зарегистрироваться',
      gotAccount: 'Есть аккаунт?',
      signin: 'Войти',
      registerTitle: 'Регистрация',
      registerBtn: 'Зарегистрироваться',
    },
    apiAnswers: {
      ERR_NETWORK: 'Ошибка сети',
      InvalidLoginOrPassword:
        'Неправильный логин или пароль. Попробуйте еще раз.',
      successLogin: 'Удачный вход',
      NotAuthorizated: 'Не авторизован',
      ErrorAuthorization: 'Ошибка авторизации',
      'Not Found': 'Не найдено',
      UserUpdated: 'Пользователь обновлен',
      ProjectCreated: 'Проект успешно создан',
      ProjectUpdated: 'Проект успешно обновлен',
      ProjectDeleted: 'Проект успешно удалён',
      PasswordCreated: 'Пароль успешно добавлен и зашифрован',
      PasswordUpdated: 'Пароль успешно обновлен и зашифрован',
      PasswordDeleted: 'Пароль удалён',
      ExistingEmail: 'Email занят',
      ExistingLogin: 'Логин занят',
      UserCreated: 'Регистрация прошла успешно',
      InvalidEmail: 'Некорретный email',
    },
    header: {
      brandName: 'Менеджер паролей',
      logout: 'Выход',
      menu: {
        mainPage: 'Главная',
      },
    },
    profilePage: {
      title: 'Профиль пользователя {{user}}',
      login: 'Логин',
      loginPlaceholder: 'Введите новый логин',
      email: 'Email',
      emailPlaceholder: 'Введите новый email',
      password: 'Пароль',
      passwordPlaceholder: 'Введите новый пароль',
      submit: 'Сохранить',
    },
    homePage: {
      newProject: 'Новый проект',
      search: 'Поиск',
      noProjects: 'Проектов еще нет, добавьте первый.',
      modal: {
        newProject: 'Новый проект',
        projectName: 'Название проекта',
        projectNamePlaceholder: 'Введите название нового проекта',
        projectDescription: 'Описание проекта',
        projectDescriptionPlaceholder:
          'Введите описание нового проекта (необязательно)',
        projectColor: 'Цвет проекта (необязательно)',
        save: 'Сохранить',
        cancel: 'Отмена',
      },
    },
    projectPage: {
      notFound: 'Проект не найден',
      goBack: 'Вернуться назад',
      passwordsNotFound: 'Сохраненных паролей не найдено',
      newPassword: 'Новый пароль',
      updateProject: 'Обновить проект',
      deleteProject: 'Удалить проект',
      projectName: 'Название проекта',
      projectNamePlaceholder: 'Введите название нового проекта',
      projectDescription: 'Описание проекта',
      projectDescriptionPlaceholder:
        'Введите описание нового проекта (необязательно)',
      projectColor: 'Цвет проекта (необязательно)',
      deleteProjectModal: {
        deleteProject: 'Вы уверены что хотите удалить проект "{{projectName}}"',
        passwordsWillAlsoDeleted:
          'Все пароли в этом проекте так же будут удалены',
        delete: 'Удалить',
        cancel: 'Отмена',
      },
      newPasswordModal: {
        newPassword: 'Добавление нового пароля в проект "{{projectName}}"',
        passwordName: 'Имя',
        passwordNamePlaceholder: 'Введите имя нового пароля',
        passwordLogin: 'Логин',
        passwordLoginPlaceholder: 'Введите логин',
        passwordPassword: 'Пароль',
        passwordPasswordPlaceholder: 'Введите пароль',
        passwordComment: 'Комментарий',
        passwordCommentPlaceholder: 'Введите комментарий (необязательно)',
        submit: 'Добавить',
        cancel: 'Отмена',
      },
      passwordCard: {
        login: 'Логин',
        password: 'Пароль',
        comment: 'Комментарий',
        update: 'Обновить',
        delete: 'Удалить',
        notEnoughFieldsToUpdate:
          'Заполнены не все поля обязательные поля для обновления пароля',
      },
      deletePasswordModal: {
        confirmDelete: 'Вы уверены что хотите удалить этот пароль?',
        submit: 'Удалить',
        cancel: 'Отмена',
        noPasswordIdProvided: 'Не указан ID пароля для удаления',
      },
    },
  },
}
export default ru
