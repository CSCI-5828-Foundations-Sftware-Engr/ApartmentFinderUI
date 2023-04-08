const mongooseConnect = require('../../dbConnect/dbConnect');
const mongoose = require('mongoose');

let basicSetup = () => {
    before((done)=>{              // runs before the first test case
        mongooseConnect.dbconnect()   // connection to the data base
                .once('open', ()=>done())
                .on('error',(error) => done(error))
    })

    after((done)=>{                       // runs after the last test case
        mongooseConnect.dbclose()
                .then(()=>done())
                .catch((err)=>done(err))
    })
}

module.exports = basicSetup;