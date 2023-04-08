const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../index');

describe('POST: /property route to get property details', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('invalid propertyId', (done)=>{            // test case 1 - no property found
        let toSendData = {propertyId:'1234'} 
        request(app).post('/property')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(201);
                expect(res.body).to.have.property("property");
                done();
            })
            .catch((err) => done(err))
    })

    it('valid propertyId but without reviews', (done)=>{            // test case 1 - no property found
        let toSendData = {propertyId:'R1641286802'} 
        request(app).post('/property')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("property").and.not.to.be.empty;
                expect(res.body).to.have.property("reviews").and.to.be.empty;
                expect(res.body).to.have.property("reviewAnalysis").and.to.be.empty;
                done();
            })
            .catch((err) => done(err))
    })

    it('valid propertyId but with reviews', (done)=>{            // test case 1 - no property found
        let toSendData = {propertyId:'R1407657653'} 
        request(app).post('/property')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("property").and.not.to.be.empty;
                expect(res.body).to.have.property("reviews").and.not.to.be.empty;
                expect(res.body).to.have.property("reviewAnalysis").and.not.to.be.empty;
                done();
            })
            .catch((err) => done(err))
    })
})