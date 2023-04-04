import Router from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import config from 'config'
const SECRET_KEY = config.get('secretWord')
const EXPIRES = config.get('expiresIn')
const router = new Router()


router.post('/registration', [
 check('email', "Wrong email").isEmail(),
 check('password', 'Password must at least 5 symbols').isLength({ min: 5 })

], async (req, res) => {
 try {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
   return res.status(400).json({ message: "Uncorrect request", errors })
  }
  const { email, password } = req.body

  const candidate = await User.findOne({ email })

  if (candidate) {
   return res.status(400).json({ message: `User with email ${email} already exist` })
  }

  const hashedPassword = await bcrypt.hash(password, 15)
  const user = new User({ email, password: hashedPassword })
  await user.save()
  return res.json({ message: "User created" })
 }
 catch (e) {
  return res.json({ message: e.res.data.message })
 }
})

router.post('/login', [

], async (req, res) => {
 try {

  const { email, password } = req.body
  const user = await User.findOne({ email })


  if (!user) {
   return res.status(404).json({ message: "User not found" })
  }

  const isPassValid = bcrypt.compareSync(password, user.password)
  if (!isPassValid) {
   return res.status(400).json({ message: "Invalid password" })
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: EXPIRES })
  const { diskSpace, id, usedSpace, files } = user

  return res.json({
   message: "Logged in",
   token,
   expiresIn: new Date(new Date().setDate(new Date().getDate() + +EXPIRES[0])),
   user_data: { email, diskSpace, id, usedSpace, files }
  })

 }
 catch (e) {
  console.log(e)
  res.send({ message: "server error" })
 }
})

export default router