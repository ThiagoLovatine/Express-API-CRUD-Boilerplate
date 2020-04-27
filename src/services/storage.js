const storageOptions = require("../config/services.json").storage;

class Storage {
  async minio(fileStream, filename) {
    const Minio = require("minio");

    var minioClient = new Minio.Client({
      endPoint: storageOptions.minio.endPoint,
      port: storageOptions.minio.port,
      useSSL: storageOptions.minio.useSSL,
      accessKey: storageOptions.minio.accessKey,
      secretKey: storageOptions.minio.secretKey,
    });

    try {
      const response = minioClient.putObject(storageOptions.minio.bucket, filename, fileStream);
      return response;
    } catch(e) {
        throw(e);
    }
  }
}

module.exports = Storage;
