const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../index');

describe('GET: /allproperties route to get all properties from DB', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid data', (done)=>{            // test case 1
        request(app).get('/allproperties')
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("properties");
                done();
            })
            .catch((err) => done(err))
    })
})