// mongodb+srv://pst9696:<password>@cluster0.drbbd.mongodb.net/?retryWrites=true&w=majority

const mongoose = require('mongoose');


 async function main() {
    //   const respo = await mongoose.connect('mongodb://localhost:27017/test');
    try {
        await mongoose.connect('mongodb+srv://pst9696:database9696@cluster0.drbbd.mongodb.net/MicroServices-Posts?retryWrites=true&w=majority');
        console.log('mongoDB connected successfully...');
    } catch (error) {
        console.log(error, 'DB error');
    }
    
    
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
// main().catch(err => console.log(err));
// export default main;
module.exports = {main};