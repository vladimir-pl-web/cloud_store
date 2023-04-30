import File from '../models/File.js'
import User from '../models/User.js'
import config from 'config'
import fs from 'fs'
import fileService from '../services/fileService.js'

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, parent, user: req.user.id })
            const parentFile = await File.findOne({ _id: parent })
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }

            await file.save()
            return res.status(200).json(file)

        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {

        try {
            const { sort, dir } = req.query
            console.log(sort, dir, "request");
            let files
            switch (sort) {
                case "name":
                     files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ name: dir })
                     break
                case "type":
                     files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ type: dir })
                     break
                case "date":
                     files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ created: dir })
                     break
                case "size":
                     files = await File.find({ user: req.user.id, parent: req.query.parent }).sort({ size: dir })
                     break
                default:
                     files = await File.find({ user: req.user.id, parent: req.query.parent })
                     break
            }
            //const files = await File.find({ user: req.user.id, parent: req.query.parent })
            let file
            if (req.query.parent) {
                file = await File.findOne({ _id: req.query.parent, user: req.user.id, })
            } else {
                file = await File.findOne({ parent: null, user: req.user.id, })
            }
            return res.json({ files })
        } catch (e) {
            return res.status(500).json({ message: "Can not get files" })
        }
    }
    async uploadFiles(req, res) {
        try {
            const file = req.files.file
            const parent = await File.findOne({ user: req.user.id, _id: req.body.parent })
            const user = await User.findOne({ _id: req.user.id })

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({ message: "There is no space on the disk" })
            }
            user.usedSpace = user.usedSpace + file.size
            const onSpaceRemove = (str) => {
                return fileService.removeSpaces(str)
            }

            let path
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${onSpaceRemove(parent.path)}\\${onSpaceRemove(file.name)}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${onSpaceRemove(file.name)}`
            }

            if (fs.existsSync(path)) {
                return res.status(500).json({ message: `File named ${file.name} already exist` })
            }

            let filePath = file.name
            if (parent) filePath = `${parent.path}\\${file.name}`
            file.mv(path)
            const type = file.name.split(".").pop()
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: onSpaceRemove(filePath),
                parent: parent?._id,
                user: user._id
            })
            await dbFile.save()
            await user.save()
            return res.status(200).json(dbFile)
        } catch (e) {
            return res.status(500).json({
                e,
                message: "Upload error"
            })
        }
    }

    async downloadFile(req, res) {

        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })
            const path = `${config.get('filePath')}\\${req.user.id}\\${file.path}`


            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            } else {
                return res.status(400).json({ message: "Download error", d: "asdasdasd" })
            }

        }
        catch (e) {
            console.log(e, "error")
            return res.status(500).json({
                e,
                message: "Download error"
            })
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })
            if (!file) {
                return res.status(404).json({ message: 'File not found' })
            }
            fileService.deleteFile(file)
            await file.deleteOne()
            return res.status(200).json({ message: "Deleted" })
        }
        catch (e) {
            console.log(e, "eeee")
            return res.status(500).json({
                e,
                message: "Server Error"
            })
        }
    }
}

const fileController = new FileController()
export default fileController