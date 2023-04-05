import jwt from 'jsonwebtoken'
import config from 'config'


export const corsMiddleware = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
 res.header("Access-Control-Allow-Headers", "Content-Type", "Authorization");
 next()
}

export const authMiddleware = async(req, res, next) => {
 if (req.method === "OPTIONS") return next()
 try {
  const token = req.headers.authorization.split(" ")[1]
  if (token === 'null') {
   return res.status(401).json({ message: "Auth Error" })
  }
  else {
   const data = jwt.verify(token, config.get("secretWord"))
   req.user = data
  }

  next()
 }
 catch (e) {
  console.log(e, "error")
  //return res.json({ message: e.res.data.message })
 }
 next()
}