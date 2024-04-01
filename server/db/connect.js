var mongoose = require('mongoose');

const env = require('../../env.json');

var mongoDB = "mongodb+srv://crowni:" + env.pw + "@cluster0.z7dgj.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

