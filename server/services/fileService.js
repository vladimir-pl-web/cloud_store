import fs from 'fs'
import File from '../models/File.js'
import config from 'config'

class FileService {
  createDir(file) {
    return new Promise(((resolve, reject) => {
      const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({ message: "Folder was created" })
        } else {
          return reject({ message: "Folder already created" })
        }
      }
      catch (e) {
        return reject(e, { message: "File error" })
      }
    }))
  }

}

const fileService = new FileService()
export default fileService