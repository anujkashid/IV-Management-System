const multer = require('multer')
const path = require('path')

const photoStorage = multer.diskStorage({
    destination : ( req, file, cb) => {
        cb(null,path.join(__dirname,'./Images'))
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const photoUpload = multer({
    storage:photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 *1024 },
}).single('visit_student_data');

const photoUpload1 = multer({
    storage:photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 *1024 },
}).single('visit_faculty_data');

module.exports = {photoUpload, photoUpload1}