import multer from "multer";
import { v2 } from "cloudinary";
import cloudinary from "cloudinary";

const storage = multer.memoryStorage();

// Configure Cloudinary



const uploadDocuments = async (fileBuffer) => {
    cloudinary.v2.config({
        cloud_name: process.env.cloud_name, //'your_cloud_name',
        api_key: process.env.api_key, //'your_api_key',
        api_secret: process.env.api_secret, //'your_api_secret'
    });
    console.log("this is file from cloudinary", fileBuffer);
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: "auto", 
    };
    try {
        const result = await new Promise((resolve, reject) => {
            const stream = v2.uploader.upload_stream(
                options,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
            stream.end(fileBuffer);
        });
        return result;
    } catch (error) {
        console.log("Upload Failed:", error);
    }
};


const upload = multer({ storage }).single('file');


export {uploadDocuments, upload};
