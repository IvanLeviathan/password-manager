import * as dotenv from 'dotenv'
import path = require('path')
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') })

import dbConnect from './db'
import startServer from './express'
import prelaunchCheck from './utils/prelaunchcheck'

prelaunchCheck()
;(async function () {
  await dbConnect()
  await startServer()
})()
