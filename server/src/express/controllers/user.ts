import { Request, Response } from 'express'
import UserModel from '../../db/models/user'
import { isValidObjectId } from 'mongoose'
import crypto from 'crypto'
import md5 from 'md5'
import PasswordModel from '../../db/models/password'
import ProjectModel from '../../db/models/project'
/**
 * Get user by id
 * @param req Requset
 * @param res Response
 * @returns IUser | Response
 */
export const getUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body.user?.id) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserIdProvided',
    })
  }
  if (!isValidObjectId(req.body.user.id)) {
    return res.status(400).json({
      status: 400,
      message: 'NotValidId',
    })
  }

  const user = await UserModel.findById(req.body.user.id)
    .exec()
    .catch((e) => {
      return res.status(400).json({
        status: 400,
        message: 'Error',
        data: e,
      })
    })
  if (!!user) {
    return res.status(200).json({
      status: 200,
      message: 'success',
      data: user,
    })
  }

  return res.status(404).json({
    status: 404,
    message: 'UserNotFound',
  })
}

/**
 * Get all users
 * @param req Requst
 * @param res Response
 * @returns IUser[] | Response
 */
export const getUsers = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const users = await UserModel.find()
    .exec()
    .catch((e) => {
      return res.status(400).json({
        status: 400,
        message: 'Error',
        data: e,
      })
    })
  return res.status(200).json({
    status: 200,
    message: 'success',
    data: users,
  })
}
/**
 * Create new user
 * @param req Request
 * @param res Response
 * @returns IUser | Response
 */
export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?.email) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserEmailProvided',
    })
  }

  if (!req.body?.login) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserLoginProvided',
    })
  }

  if (!req.body?.password) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserPasswordProvided',
    })
  }

  const validEmailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!req.body?.email.match(validEmailRegex)) {
    return res.status(400).json({
      status: 400,
      message: 'InvalidEmail',
    })
  }

  //get all users to check existing emails and logins
  const users =
    (await UserModel.find()
      .exec()
      .catch((e: Error): void => {
        console.log(e)
      })) || []

  const existingEmail = users.find((user) => user.email === req.body.email)
  if (!!existingEmail) {
    return res.status(409).json({
      status: 409,
      message: 'ExistingEmail',
    })
  }

  const existingLogin = users.find((user) => user.login === req.body.login)
  if (!!existingLogin) {
    return res.status(409).json({
      status: 409,
      message: 'ExistingLogin',
    })
  }

  //encrypt password
  const salt = crypto.randomUUID()
  const newPassword = md5(req.body.password + salt)

  //create new user
  const user = new UserModel({
    login: req.body.login,
    email: req.body.email,
    password: newPassword,
    salt: salt,
  })

  const saveRes = await user.save().catch((e) => console.log(e))
  if (!!saveRes?._id) {
    return res.status(201).json({
      status: 201,
      message: 'UserCreated',
      data: saveRes,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'UserNotCreated',
    })
  }
}

/**
 * Update user
 * @param req Request
 * @param res Response
 * @returns IUser | Response
 */
export const updateUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?.user?.id) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserIdProvided',
    })
  }

  if (!req.body?.email) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserEmailProvided',
    })
  }

  //get all users to check existing emails and logins
  const users =
    (await UserModel.find()
      .exec()
      .catch((e: Error): void => {
        console.log(e)
      })) || []
  const existingEmail = users.find(
    (user) =>
      user.email === req.body.email && user._id.toString() !== req.body.user.id,
  )
  if (!!existingEmail) {
    return res.status(409).json({
      status: 409,
      message: 'ExistingEmail',
    })
  }

  let updateObj = {
    email: req.body.email,
  }

  if (!!req.body?.password) {
    //encrypt password
    const salt = crypto.randomUUID()
    const newPassword = md5(req.body.password + salt)
    const passwordObj = {
      password: newPassword,
      salt: salt,
    }
    updateObj = {
      ...updateObj,
      ...passwordObj,
    }
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.body.user.id,
    updateObj,
    { new: true },
  )
    .exec()
    .catch((e) => console.log(e))

  if (!!updatedUser) {
    return res.status(200).json({
      status: 200,
      message: 'UserUpdated',
      data: updatedUser,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'UserNotFoundForUpdate',
    })
  }
}

/**
 * Delete user
 * @param req Request
 * @param res Response
 * @returns IUser | Response
 */
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body.user.id) {
    return res.status(400).json({
      status: 400,
      message: 'NoUserIdProvided',
    })
  }

  const deleteRes = await UserModel.findByIdAndDelete(req.body.user.id)
    .exec()
    .catch((e) => console.log(e))

  if (!!deleteRes?._id) {
    //delete projects which this user owner
    await ProjectModel.deleteMany({
      owner: req.body.user.id,
    })
      .exec()
      .catch((e) => console.log(e))
    //delete passwords which this user owner
    await PasswordModel.deleteMany({
      owner: req.body.user.id,
    })
      .exec()
      .catch((e) => console.log(e))

    return res.status(200).json({
      status: 200,
      message: 'UserDeleted',
      data: deleteRes,
    })
  } else {
    return res.status(404).json({
      status: 404,
      message: 'UserNotFoundForDelete',
    })
  }
}
