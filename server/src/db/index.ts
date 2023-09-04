import mongoose from 'mongoose'

export default async function dbConnect() {
  const connection = await mongoose
    .connect(
      `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`,
      {
        authSource: 'admin',
      },
    )
    .then((e) => {
      console.log('Mongo connected')
    })
    .catch((e) => {
      console.log('Mongo FAIELD to connect', e)
      throw new Error('No mongo connect!!')
    })
}
