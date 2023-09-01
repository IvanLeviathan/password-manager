import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
if (!process.env.CRYPTO_IV)
  throw new Error('Cant find CRYPTO_IV variable in .env')
if (!process.env.CRYPTO_KEY)
  throw new Error('Cant find CRYPTO_KEY variable in .env')
const initializationVector = Buffer.from(process.env.CRYPTO_IV, 'utf-8')
const cypherKey = Buffer.from(process.env.CRYPTO_KEY, 'utf-8')

export function encrypt(text: string) {
  try {
    const cipher = crypto.createCipheriv(
      algorithm,
      cypherKey,
      initializationVector,
    )
    let encryptedData = cipher.update(text, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
  } catch (e) {
    console.log('Cant encrypt', e)
    return text
  }
}

export function decrypt(text: string) {
  try {
    const decipher = crypto.createDecipheriv(
      algorithm,
      cypherKey,
      initializationVector,
    )
    let decryptedData = decipher.update(text, 'hex', 'utf-8')
    decryptedData += decipher.final('utf-8')
    return decryptedData
  } catch (e) {
    console.log('Cant decrypt', e)
    return text
  }
}
