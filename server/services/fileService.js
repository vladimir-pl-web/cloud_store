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
  getPath(file) {
  return `${config.get('filePath')}\\${file.user}\\${file.path}`
  }
  removeSpaces(str) {
    return str.split(" ").join("")
  }
  
  isDirEmpty(path) {
    return fs.readdirSync(path).length === 0;
}
  deleteFile(file) {
    const path = this.getPath(file)
    if (file.type === "dir") {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }
}

const fileService = new FileService()
export default fileService