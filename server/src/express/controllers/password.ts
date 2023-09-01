import { Request, Response } from 'express'
import PasswordModel, { IPassword } from '../../db/models/password'
import { decrypt, encrypt } from '../../utils/crypto'

export const createPassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?.project) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordProjectProvided',
    })
  }
  if (!req.body?.name) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordNameProvided',
    })
  }
  if (!req.body?.login) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordLoginProvided',
    })
  }
  if (!req.body?.password) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordPasswordProvided',
    })
  }
  const newPasswordObj: IPassword = {
    owner: req.body.user.id,
    project: req.body.project,
    name: req.body.name,
    login: '',
    password: '',
    comment: '',
  }
  const encryptedLogin = encrypt(req.body.login)
  if (!encryptedLogin) {
    return res.status(400).json({
      status: 400,
      message: 'CantEncryptLogin',
    })
  }
  newPasswordObj.login = encryptedLogin

  const encryptedPassword = encrypt(req.body.password)
  if (!encryptedPassword) {
    return res.status(400).json({
      status: 400,
      message: 'CantEncryptPassword',
    })
  }
  newPasswordObj.password = encryptedPassword

  const encryptedComment = encrypt(req.body.comment)
  if (!encryptedPassword) {
    return res.status(400).json({
      status: 400,
      message: 'CantEncryptComment',
    })
  }
  newPasswordObj.comment = encryptedComment

  const model = new PasswordModel({ ...newPasswordObj })

  const saveRes = await model.save().catch((e) => console.log(e))
  if (!!saveRes?._id) {
    return res.status(201).json({
      status: 201,
      message: 'PasswordCreated',
      data: saveRes,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'PasswordNotCreated',
    })
  }
}

export const getPasswords = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.params?.projectId) {
    return res.status(400).json({
      status: 400,
      message: 'NoProjectProvided',
    })
  }

  let passwords: IPassword[] =
    (await PasswordModel.find({
      owner: req.body.user.id,
      project: req.params.projectId,
    })
      .exec()
      .catch((e) => console.log(e))) || []

  passwords = passwords.map((password: IPassword) => {
    password.login = decrypt(password.login)
    password.password = decrypt(password.password)
    if (!!password.comment) password.comment = decrypt(password.comment)
    return password
  })

  return res.status(200).json({
    status: 200,
    data: passwords,
  })
}

export const updatePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?._id) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordIdProvided',
    })
  }
  if (!req.body?.login) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordLoginProvided',
    })
  }
  if (!req.body?.password) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordPasswordProvided',
    })
  }

  //get password to check ownership
  const password = await PasswordModel.findOne({
    owner: req.body.user.id,
    _id: req.body._id,
  })

  if (!password || password.owner.toString() !== req.body.user.id) {
    return res.status(404).json({
      status: 404,
      message: 'PasswordNotFound',
    })
  }

  req.body.login = encrypt(req.body?.login)
  req.body.password = encrypt(req.body?.password)
  if (!req.body.comment) req.body.comment = encrypt(req.body.comment)

  const updatedPassword = await PasswordModel.findByIdAndUpdate(
    req.body._id,
    { ...req.body },
    { new: true },
  )
    .exec()
    .catch((e) => console.log(e))

  if (!!updatedPassword) {
    return res.status(200).json({
      status: 200,
      message: 'PasswordUpdated',
      data: updatedPassword,
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'PasswordUpdated',
    })
  }
}

export const deletePassword = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  if (!req.body?._id) {
    return res.status(400).json({
      status: 400,
      message: 'NoPasswordIdProvided',
    })
  }

  //get password to check ownership
  const password = await PasswordModel.findOne({
    owner: req.body.user.id,
    _id: req.body._id,
  })

  if (!password || password.owner.toString() !== req.body.user.id) {
    return res.status(404).json({
      status: 404,
      message: 'PasswordNotFound',
    })
  }

  const deleteRes = await PasswordModel.findByIdAndDelete(req.body._id)
    .exec()
    .catch((e) => console.log(e))

  if (!!deleteRes?._id) {
    return res.status(200).json({
      status: 200,
      message: 'PasswordDeleted',
      data: deleteRes,
    })
  } else {
    return res.status(404).json({
      status: 404,
      message: 'PasswordNotDeleted',
    })
  }
}
