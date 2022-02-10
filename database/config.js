const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: true
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la de conectar a la base de daos')
    }
}

module.exports = {
    dbConnection
}