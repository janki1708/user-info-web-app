import React, { useState } from 'react';
import AWS from 'aws-sdk'
import Pool from '../UserPool';

const S3_BUCKET = process.env.REACT_APP_BUCKET;
const REGION = process.env.REACT_APP_REGION;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: REGION,
})

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const username = Pool.getCurrentUser().getUsername();

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        const extension = file.name.split('.').pop();

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: `${username}.${extension}`,
        };
        var s3 = new AWS.S3();

        s3.putObject(params).promise()
            .then(res => {
                alert("Success");
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={() => uploadFile(selectedFile)}> Upload </button>
        </div>
    )
}

export default UploadImage;