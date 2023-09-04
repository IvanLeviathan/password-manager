import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers['x-auth-token']
    if (!token || typeof token !== 'string') {
      return res.status(401).json({ status: 401, message: 'NotAuthorizated' })
    }
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
    req.body.user = decoded
    next()
  } catch (e) {
    res.status(400).json({ status: 400, message: 'ErrorAuthorization' })
    console.log(e)
  }
}
