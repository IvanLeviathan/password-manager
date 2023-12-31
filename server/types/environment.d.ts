declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_DB_USER: string
      MONGO_DB_PASSWORD: string
      MONGO_PROTOCOL: string
      MONGO_DB_HOST: string
      MONGO_DB_NAME: string
      JWT_SECRET: string
      CRYPTO_KEY: string
      CRYPTO_IV: string
      VITE_FRONT_API_URL: string
    }
  }
}

export {}
