const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../index');

describe('POST: /bookappointment route to book appointment for the user', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid booking details', (done)=>{            // test case 1
        let toSendData = {userName:'testUser', propertyId: 'testId', appointmentDate: "testDate", appointmentTime: "testTime"}; 
        request(app).post('/bookappointment')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Appointment sucessfully booked");
                done();
            })
            .catch((err) => done(err))
    })
})


describe('POST: /getappointment route to get appointments for the user', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid userName to get appointmentList', (done)=>{            // test case 1
        let toSendData = {userName:'testUser'}; 
        request(app).post('/getappointment')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.have.property("appointments");
                //expect(res.body).to.have.property("appointments").greaterThan(0);
                done();
            })
            .catch((err) => done(err))
    })

    it('invalid userName to get appointmentList', (done)=>{            // test case 2
        let toSendData = {userName:'testUser1'}; 
        request(app).post('/getappointment')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(201);
                expect(res.body.message).to.equal("Appointment does not exist");
                done();
            })
            .catch((err) => done(err))
    })
})

describe('POST: /cancelappointment route to cancel appointments for the user', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js

    it('invalid appointment details to cancel appointment', (done)=>{            // test case 1
        let toSendData = {userName:'testUser1', propertyId: 'testId', appointmentDate: "testDate", appointmentTime: "testTime"}; 
        request(app).post('/cancelappointment')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(201);
                expect(res.body.message).to.equal("Appointment does not exist");
                done();
            })
            .catch((err) => done(err))
    })
  
    it('valid appointment details to cancel appointment', (done)=>{            // test case 2
        let toSendData = {userName:'testUser', propertyId: 'testId', appointmentDate: "testDate", appointmentTime: "testTime"}; 
        request(app).post('/cancelappointment')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("Data deleted");
                done();
            })
            .catch((err) => done(err))
    })
})