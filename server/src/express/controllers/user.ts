import { Request, Response } from 'express'
import UserModel from '../../db/models/user'
import { isValidObjectId } from 'mongoose'

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.params.id) {
    return res.json({
      code: 500,
      message: 'NoUserIdProvided',
    })
  }

  if (!isValidObjectId(req.params.id)) {
    return res.json({
      code: 500,
      message: 'NotValidId',
    })
  }

  const user = await UserModel.findById(req.params.id)
    .exec()
    .catch((e) => {
      return res.json({
        code: 500,
        message: 'Error',
        data: e,
      })
    })
  if (!!user) {
    return res.json({
      code: 200,
      message: 'success',
      data: user,
    })
  }

  return res.json({
    code: 404,
    message: 'UserNotFound',
  })
}

export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const users = await UserModel.find()
    .exec()
    .catch((e) => {
      return res.json({
        code: 500,
        message: 'Error',
        data: e,
      })
    })
  return res.json({
    code: 200,
    message: 'success',
    data: users,
  })
}
