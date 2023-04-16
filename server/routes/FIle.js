import Router from 'express'
import File from '../models/File.js'
const router = new Router()
import { authMiddleware } from '../middlwares/middlwares.js'
import fileController from '../controllers/fileController.js'


router.post("", authMiddleware, fileController.createDir)
router.get("", authMiddleware, fileController.getFiles)
router.post("/upload", authMiddleware, fileController.uploadFiles)
export default router