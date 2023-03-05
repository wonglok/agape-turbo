import { DeleteObjectCommand, PutBucketCorsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs'
import * as formidable from 'formidable'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
}

const s3Client = new S3Client({
  region: process.env.LOK_S3_REGION,
  // endpoint: process.env.LOK_S3_ENDPOINT,
  sslEnabled: true,
  s3ForcePathStyle: false,
  credentials: {
    accessKeyId: process.env.LOK_S3_ACCESS_KEY,
    secretAccessKey: process.env.LOK_S3_ACCESS_KEY_SECRET,
  },
})
// Set parameters.
// Create initial parameters JSON for putBucketCors.
const thisConfig = [
  {
    AllowedHeaders: ['*'],
    AllowedMethods: ['GET', 'POST', 'PUT'],
    AllowedOrigins: ['*'],
    ExposeHeaders: ['ETag'],
  },
]
// Create CORS parameters.
const corsParams = {
  Bucket: process.env.LOK_S3_BUCKET,
  CORSConfiguration: { CORSRules: thisConfig },
}
s3Client.send(new PutBucketCorsCommand(corsParams))

export async function uploadFileToObjectStorage(base64Data, path, fileName, ContentType, size) {
  const post = await createPresignedPost(s3Client, {
    Bucket: process.env.LOK_S3_BUCKET,
    Key: `${path}/${fileName}`,
    Fields: {
      acl: 'public-read',
      'Content-Type': `${ContentType}`,
    },
    Expires: 600, // seconds
    Conditions: [
      ['content-length-range', 0, size], // up to 1 MB
    ],
  })

  post.downloadURL = `${process.env.LOK_S3_ENDPOINT}/${path}/${fileName}`
  return post

  // console.log(resCORS)
  // //
  // const params = {
  //   Bucket: process.env.LOK_S3_BUCKET,
  //   Key: `${path}/${fileName}`,
  //   // Body: base64Data,
  //   ACL: 'public-read',
  //   // ContentEncoding: 'base64',
  //   ContentType: `${ContentType}`,
  // }

  // await s3Client.send(new PutObjectCommand(params))

  // let signedUrl = await getSignedUrl(s3Client, new PutObjectCommand(params), {
  //   Expires: 3600,
  // })

  // return signedUrl //
}

export async function deleteFileFromObjectStorage(url) {
  const Key = url.split(`${process.env.LOK_S3_ENDPOINT}/`).pop()
  const params = {
    Bucket: process.env.LOK_S3_BUCKET,
    Key,
  }

  // eslint-disable-next-line consistent-return
  return s3Client.send(new DeleteObjectCommand(params))
}

export default async function API(req, res) {
  const result = await new Promise((resolve, reject) => {
    const form = new formidable.Formidable()

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })

  let data = await uploadFileToObjectStorage(
    null,
    // fs.readFileSync(result.files.file.filepath),
    process.env.LOK_S3_FOLDER,
    result.fields.fileName,
    result.fields.mimetype,
    result.fields.size,
  )

  res.json(data)

  // let bodyData = JSON.parse(req.body)
  // let method = bodyData.method

  // if (method === 'upload') {

  //   // let fileData = Buffer.from(bodyData.fileData, 'base64')
  //   // let fileName = path.basename(bodyData.fileName)
  //   // let contentType = bodyData.contentType

  //   let url = ''
  //   res.json(url)
  // } else if (method === 'delete') {
  //   let url = bodyData.url
  //   let result = await deleteFileFromObjectStorage(url)

  //   res.json(result)
  // }
}

//
