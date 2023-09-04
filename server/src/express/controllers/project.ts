import { Request, Response } from 'express'
import ProjectModel from '../../db/models/project'
import PasswordModel from '../../db/models/password'

export const createProject = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 400,
      message: 'NoProjectNameProvided',
    })
  }

  //create new user
  const project = new ProjectModel({
    owner: req.body.user.id,
    name: req.body.name,
    description: req.body.description,
    sort: 100,
  })

  const saveRes = await project.save().catch((e) => console.log(e))
  if (!!saveRes?._id) {
    return res.status(201).json({
      status: 201,
      message: 'ProjectCreated',
      data: saveRes,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'ProjectNotCreated',
    })
  }
}

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const projects =
    (await ProjectModel.find({ owner: req.body.user.id }, null, {
      sort: { _id: -1 },
    })
      .exec()
      .catch((e) => console.log(e))) || []

  return res.status(200).json({
    status: 200,
    data: projects,
  })
}

export const getProject = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const project = await ProjectModel.findOne({
    owner: req.body.user.id,
    _id: req.params.projectId,
  })
    .exec()
    .catch((e) => console.log(e))

  if (!!project) {
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: project,
    })
  } else {
    return res.status(404).json({
      status: 404,
      message: 'ProjectNotFound',
    })
  }
}

export const updateProject = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?._id) {
    return res.status(400).json({
      status: 400,
      message: 'NoProjectIdProvided',
    })
  }
  if (!req.body?.name) {
    return res.status(400).json({
      status: 400,
      message: 'NoProjectNameProvided',
    })
  }

  //get project to check ownership
  const project = await ProjectModel.findOne({
    owner: req.body.user.id,
    _id: req.body._id,
  })

  if (!project || project.owner.toString() !== req.body.user.id) {
    return res.status(404).json({
      status: 404,
      message: 'ProjectNotFound',
    })
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.body._id,
    { ...req.body },
    { new: true },
  )
    .exec()
    .catch((e) => console.log(e))

  if (!!updatedProject) {
    return res.status(200).json({
      status: 200,
      message: 'ProjectUpdated',
      data: updatedProject,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'ProjectNotUpdated',
    })
  }
}

export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?._id) {
    return res.status(400).json({
      status: 400,
      message: 'NoProjectIdProvided',
    })
  }

  //get project to check ownership
  const project = await ProjectModel.findOne({
    owner: req.body.user.id,
    _id: req.body._id,
  })

  if (!project || project.owner.toString() !== req.body.user.id) {
    return res.status(404).json({
      status: 404,
      message: 'ProjectNotFound',
    })
  }

  const deleteRes = await ProjectModel.findByIdAndDelete(req.body._id)
    .exec()
    .catch((e) => console.log(e))

  if (!!deleteRes?._id) {
    //delete passwords from this projects
    await PasswordModel.deleteMany({
      owner: req.body.user.id,
      project: req.body._id,
    })
      .exec()
      .catch((e) => console.log(e))

    return res.status(200).json({
      status: 200,
      message: 'ProjectDeleted',
      data: deleteRes,
    })
  } else {
    return res.status(404).json({
      status: 404,
      message: 'ProjectNotDeleted',
    })
  }
}
