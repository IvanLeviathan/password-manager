import { Schema, model, connect } from 'mongoose'
interface IUser {
  name: string
  email: string
  password: string
  salt: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
})

const UserModel = model<IUser>('User', userSchema)
export default UserModel
