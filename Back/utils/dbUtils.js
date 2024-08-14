var dbUtils = {};

dbUtils.registerUser = function () {
    const mongoose = require('mongoose');
    const uri = "mongodb+srv://chenbrilling1:1234@chencluster.b5ne8ew.mongodb.net/?retryWrites=true&w=majority&appName=ChenCluster";
    const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
    async function run() {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri, clientOptions);
            await mongoose.connection.db.admin().command({ ping: 1 });
        } finally {
            console.log("CLOSE");
            await mongoose.disconnect();
        }
    }
    run().catch(console.dir);
};


module.exports = dbUtils;