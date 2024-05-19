import * as path from "path"
import fs from "fs"

export class Files {
  saveFile(file) {
    try {
      const dirPath = path.resolve("assets")
      const filePath = path.resolve("assets", file.name)

      if (!fs.existsSync(dirPath)) {
        fs.mkdir(dirPath, (error) => {
          if (error) {
            console.log(error)
          } else {
            console.log(`The directory was created along the path: ${dirPath}`)
            file.mv(filePath)
          }
        })
      } else {
        file.mv(filePath)
      }

      return `http://localhost:${process.env.SERVER_PORT}/${file.name}`
    } catch (e) {
      console.error(e)
    }
  }
}
