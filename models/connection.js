
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://nouetclem:LuRsAaaLmPNWTih2@clementn.vywna.mongodb.net/ticketHack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));