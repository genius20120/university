import { Client } from "minio";
import { HttpException } from "../errorHandling/httpException";

class ImageService {
  private readonly minioClient;
  private readonly bucketName;
  constructor() {
    this.minioClient = new Client({
      endPoint: "localhost",
      port: 9000,
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
      const imageUrl = await this.minioClient.presignedUrl(
        "get",
        this.bucketName,
        photo_name
      );
      return imageUrl;
    } catch (e) {
      return new HttpException(500, "image_link_problem");
    }
  }
}
export const MinioClient = new ImageService();
