import { Schema, model } from 'mongoose'
interface IUser {
  login: string
  email: string
  password: string
  salt: string
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
})

const UserModel = model<IUser>('User', userSchema)
export default UserModel
