import { Schema, model } from 'mongoose'
export interface IPassword {
  owner: Schema.Types.ObjectId
  project: Schema.Types.ObjectId
  name: string
  login: string
  password: string
  comment?: string | null
  sort?: number
  color?: string
}

const passwordSchema = new Schema<IPassword>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  comment: { type: String, default: null },
  sort: { type: Number, default: 50 },
  color: { type: String, default: undefined },
})

const PasswordModel = model<IPassword>('Password', passwordSchema)
export default PasswordModel
