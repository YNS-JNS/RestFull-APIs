const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

categorySchema.method("toJSON", function () {
  
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

module.exports = mongoose.model('CategoryModel', categorySchema);
