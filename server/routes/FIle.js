import Router from 'express'
const router = new Router()
import { authMiddleware } from '../middlwares/middlwares.js'
import fileController from '../controllers/fileController.js'


router.post("", authMiddleware, fileController.createDir)
router.get("", authMiddleware, fileController.getFiles)
router.post("/upload", authMiddleware, fileController.uploadFiles)
router.get("/download", authMiddleware, fileController.downloadFile)
router.delete("/delete", authMiddleware, fileController.deleteFile)

export default router