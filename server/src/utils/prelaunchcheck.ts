const prelaunchCheck = () => {
  const criticalVars = [
    'MONGO_DB_USER',
    'MONGO_DB_PASSWORD',
    'MONGO_DB_PORT',
    'MONGO_DB_HOST',
    'MONGO_DB_NAME',
    'JWT_SECRET',
  ]

  criticalVars.forEach((variable, index) => {
    if (!process.env[variable])
      throw new Error(`Cant find ${variable} variable in .env`)
  })
}

export default prelaunchCheck
