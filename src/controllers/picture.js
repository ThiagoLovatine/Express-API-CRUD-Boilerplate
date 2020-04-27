const Database = require("../services/database");
const options = require("../config/picture.json");
const sharp = require("sharp");
const StorageService = require("../services/storage");
const Storage = new StorageService();
const randomstring = require("randomstring");
const storageOptions = require("../config/services.json").storage;

class PictureController {
  async save(req, res, next) {
    if (!req.files.image) {
      res.status(412).json({ error: true, message: "Image not found" });
    }

   

    const files = [];
    const sizes = options.sizes;
    const storageDefault = storageOptions.default;

    let ext = req.files.image.name.split(".");
    ext = ext[ext.length - 1];
    const fileName = randomstring.generate(100) + "." + ext;
    const urlPrefix = storageOptions[storageDefault].prefix + storageOptions[storageDefault].bucket + '/';

    for (let i = 0; i < sizes.length; i++) {
      const currentSize = sizes[i];
      await sharp(req.files.image.data)
        .resize(currentSize.width, currentSize.height)
        .toBuffer()
        .then(async (data) => {
          const fullUrl = urlPrefix + currentSize.name + "_" + fileName;
          await Storage[storageDefault](data, currentSize.name + "_" + fileName)
            .then((response) => {
              files.push({ [currentSize.name] : fullUrl });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const collectionName = "picture";
    const dbo = await Database();
    const collection = dbo.collection(collectionName);
    const result = await collection.insertOne({
      files
    });

    res.status(200).json(result.ops);
  }
}

module.exports = PictureController;
