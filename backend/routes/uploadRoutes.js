import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()


const storage = multer.diskStorage({

    destination(req, file, cb){
        cb(null, 'uploads')
    },

    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }

})
 
function checkFileType(file, cb){ 
    console.log("Check file Type")
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb('이미지 파일만 가능!')
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    },
})


router.post('/', upload.single('image'), (req, res) => {
    console.log("uploadRoute")
    res.send(`/${req.file.path}`)
})

export default router