import * as AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import Env from '@ioc:Adonis/Core/Env'

const s3 = new AWS.S3({
  /*region: process.env.AWS_REGION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  */
  region: Env.get('S3_REGION'),
  secretAccessKey: Env.get('S3_SECRET'),
  accessKeyId: Env.get('S3_KEY'),
});

export const uploadToS3Bucket = async (
  file: any,
  bucket: string
): Promise<{ key: string; url: string }> => {
  try {
    const { type, subtype, extname } = file;
    let mimeType = type + "/" + subtype;

    let fileType = "image/jpg";

    const name = uuid() + "." + extname;
    console.log( file )
    console.log( `type: ${type}\nsubtype: ${subtype}\nextname: ${extname}` );

    let buffer = Buffer.from(JSON.stringify(file), "utf-8");

    await s3
      .putObject({
        Key: name,
        Bucket: bucket,
        ContentType: fileType,
        Body: buffer.toString("base64"),
        ACL: "public-read",
      })
      .promise();

    let url = `https://${bucket}.s3.amazonaws.com/${name}`;
    console.log(url);
    return {
      key: name,
      url,
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};