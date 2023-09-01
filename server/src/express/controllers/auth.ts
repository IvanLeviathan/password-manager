import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../../db/models/user'
import md5 from 'md5'

export const loginController = async (req: Request, res: Response) => {
  const { login, password } = req.body
  try {
    // Find the user by login
    const user = await UserModel.findOne({ login })

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: 'InvalidLoginOrPassword',
      })
    }

    // Verify the password
    const isValid = user.password === md5(password + user.salt)
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        message: 'InvalidLoginOrPassword',
      })
    }

    // Return a JSON Web Token
    const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: 86400, // Expires in 24 hours
    })
    return res
      .status(200)
      .json({ status: 200, message: 'successLogin', data: token })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      status: 400,
      message: 'UserAuthError',
    })
  }
}
