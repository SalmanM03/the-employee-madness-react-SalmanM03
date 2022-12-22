  // https://mongoosejs.com/
  const mongoose = require("mongoose");

  const { Schema } = mongoose;
  
  const EquipmentSchema = new Schema({
    name: String,
    level: String,
    amount: Number,
  });
  
  module.exports = mongoose.model("Equipment", EquipmentSchema);
  