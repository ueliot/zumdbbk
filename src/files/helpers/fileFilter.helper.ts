
export const fileFilter = (req: Express.Request, file: Express.Multer.File , cb: Function) => {

    console.log({file});
    if(!file) return cb(new Error(`File is empty`), false)
    //const fileExtension = file.mimetype.split('/')[1];
    const fileExtension = file.originalname.split('.')[1]
    console.log(fileExtension);
    const validExtensions = ['jpg','jpeg','png','gif'];
    if (validExtensions.includes(fileExtension)){
        cb(null, true); //accept file
    }
    cb(null, false); //rejects file
}