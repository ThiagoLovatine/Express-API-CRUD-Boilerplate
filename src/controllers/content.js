const Database = require("../services/database");
const ContentHelper = require("../helpers/content");
const ContentsHelper = new ContentHelper();

class ContentController {
  async list(req, res) {
    const structure = await ContentsHelper.verifyStructure(req, res);
    const collectionName = "content_" + req.params.model;

    const dbo = await Database();

    const limit = req.params.limit || 25;
    const offset = req.params.offset || 0;

    let results = dbo.collection(collectionName);

    if (structure.config.geolocation) {
      results = results.aggregate([
        {
          $geoNear: {
            near: { type: "Point", coordinates: [-22.9064, -43.1822] },
            key: "location",
            maxDistance: 1000 * 10000,
            distanceField: "dist.calculated",
          },
        },
      ]);
    } else {
      results = await results.find();
    }

    results = await results.limit(limit).skip(offset).toArray();

    if (structure.config.geolocation) {
      for (let i = 0; i < results.length; i++) {
        if (results[i].dist && results[i].dist.calculated) {
          results[i].dist.calculated =
            (results[i].dist.calculated / 1000).toFixed(1) + "km";
        }
      }
    }

    const count = await dbo.collection(collectionName).estimatedDocumentCount();

    const response = {
      total: count,
      offset,
      limit,
      results: results,
    };
    res.status(200).json(response);
  }

  async save(req, res, next) {
    const structure = await ContentsHelper.verifyStructure(req, res);
    const collectionName = "content_" + req.params.model;
    const dbo = await Database();
    const collection = dbo.collection(collectionName);

    req.body.location = {
      type: "Point",
      coordinates: [-9.6658, -35.7353],
    };

    const result = await collection.insertOne(req.body);

    res.status(200).json(result);
  }
}

module.exports = ContentController;
