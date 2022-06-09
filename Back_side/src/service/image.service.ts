import { Client } from "minio";
import { HttpException } from "../errorHandling/httpException";

class ImageService {
  private readonly minioClient;
  private readonly bucketName;
  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_HOST || "localhost",
      port: process.env.MINIO_PORT ? +process.env.MINIO_PORT : 9000,
      useSSL: false,
      accessKey: "minioadmin",
      secretKey: "minioadmin",
    });
    this.bucketName = "profile";
  }
  async uploadPhoto(profile_name: string, file: Express.Multer.File) {
    try {
      const result = await this.minioClient.putObject(
        this.bucketName,
        profile_name,
        file.buffer
      );
      return;
    } catch (e) {
      console.log(e);

      return new HttpException(500, "image_upload_error");
    }
  }
  async generateLink(photo_name: string) {
    try {
      const imageUrl = await this.minioClient
        .presignedUrl("get", this.bucketName, photo_name)
        .then((url) => {
          return url.replace(
            `${process.env.MINIO_HOST}:${process.env.MINIO_PORT}`,
            `${process.env.SERVER_HOST_DEV}:${process.env.SERVER_PORT}/minio`
          );
        });
      return imageUrl;
    } catch (e) {
      return new HttpException(500, "image_link_problem");
    }
  }
}
export const MinioClient = new ImageService();
