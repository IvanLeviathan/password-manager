import { Schema, model } from 'mongoose'
interface IProject {
  owner: Schema.Types.ObjectId
  name: string
  description: string
  sort: number
  color?: string
}

const projectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  sort: { type: Number, default: 50 },
  color: { type: String, default: undefined },
})

const ProjectModel = model<IProject>('Project', projectSchema)
export default ProjectModel
