// import model
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localFileUpload - handler function

exports.localFileUpload = async (req, res) => {
    try {
        // fetch the file
        const file = req.files.file;
        console.log("File is here:", file);
        
        // this is server path with extention added
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'local file upload error',
        });
    }
}

// function to compare image type
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// upload to cloudinary fn
async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder};
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality;
    }
    console.log("tempfile path:", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



// image upload handler 
exports.imageUpload = async (req, res) => {
    try {
        // fetch data from req
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // get image file form req
        const file = req.files.imageFile;
        console.log("file obj:",file);

        // validation for suported extention
        const supportedTypes = ["jpg", "jpeg", "png"];
        const type = file.name.split('.')[1].toLowerCase();
        console.log("file type:",type);

        if (!isFileTypeSupported(type, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'file type not supported',
            });
        }

        // file is uploaded to cloudinary foldername "filesUploadApp"
        // const options = { folder: "filesUploadApp" };
        console.log("uploading to cloud...");
        const response = await uploadFileToCloudinary(file, "filesUploadApp");
        console.log("response:",response);

        // create entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success: true,
            imageUrl:response.secure_url,
            message: 'Image upload successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error:error,
            message: 'Error in image file upload',
        });
    }
}


// video upload handler
exports.videoUpload = async (req, res) => {
    try {
        // fetch data from req
        const { name, email, tags } = req.body;
        console.log(name, tags, email);
        
        // get video file form req
        const file = req.files.videoFile;
        console.log("video file obj:", file);

        // validation of file format 
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1];
        console.log("fileType:", fileType);
        
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'file type not supported',
            });
        }

        // validation of file for 5MB size
        if (file.size > Math.floor(5*1048576) ) {
            return res.status(400).json({
                success: false,
                // fileSize:`is ${Math.floor(file.size/1048576) }mb`,
                message: 'file size exceeds the limit',
            });
        }



        // file is uploaded to cloudinary foldername "filesUploadApp"
        console.log("uploading to cloud...");
        const response = await uploadFileToCloudinary(file, "filesUploadApp");
        console.log("response:", response);
        
        // create entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success: true,
            imageUrl:response.secure_url,
            message: 'Image upload successfully',
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error:error,
            message: 'Error in video file upload',
        });
    }
    
}

// image reduser handler

exports.imageReducerUpload = async (req, res) => {
    try {
        // fetch data from req
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // get image file form req
        const file = req.files.imageFile;
        console.log("file obj:",file);

        // validation for suported extention
        const supportedTypes = ["jpg", "jpeg", "png"];
        const type = file.name.split('.')[1].toLowerCase();
        console.log("file type:", type);

        if (!isFileTypeSupported(type, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'file type not supported',
            });
        }

        // file is uploaded to cloudinary foldername "filesUploadApp"
        // also try to reduce size by height attribute
        console.log("uploading to cloud...");
        const response = await uploadFileToCloudinary(file, "filesUploadApp",60);
        console.log("response:",response);

        
        // create entry to DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.status(200).json({
            success: true,
            imageUrl:response.secure_url,
            message: 'Image reduced and upload successfully',
        });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error:error,
            message: 'Error in image file upload',
        });
    }
}