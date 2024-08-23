const mongoose= require('mongoose');
const mongoURI ='mongodb://localhost:27017/'

const connectTomongo=()=>{
 mongoose.connect(mongoURI)

}
module.exports = connectTomongo;