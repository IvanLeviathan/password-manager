import { Schema, model } from 'mongoose'
interface IProject {
  owner: Schema.Types.ObjectId
  name: string
  description: string
  sort: number
}

const projectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String },
  sort: { type: Number, default: 500 },
})

const ProjectModel = model<IProject>('Project', projectSchema)
export default ProjectModel
