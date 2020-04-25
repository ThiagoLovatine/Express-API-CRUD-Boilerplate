const ContentConfig = require("../config/content.json");

class ContentHelper {
  async verifyStructure(req, res) {
    const { model } = req.params;
    if (!model) return false;
    const config = ContentConfig[model] === undefined ? {} : ContentConfig[model];

    return {
      model,
      config,
    };
  }
}

module.exports = ContentHelper;
