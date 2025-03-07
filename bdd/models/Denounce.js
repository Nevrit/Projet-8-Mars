const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DenounceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  abuseType: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Denounce = mongoose.model("Denounce", DenounceSchema);
module.exports = Denounce;