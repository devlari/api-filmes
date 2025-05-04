import AWS from 'aws-sdk'

const r2 = new AWS.S3({
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    endpoint: process.env.R2_ENDPOINT,
    region: process.env.R2_REGION,
    signatureVersion: 'v4',
})

export default r2
