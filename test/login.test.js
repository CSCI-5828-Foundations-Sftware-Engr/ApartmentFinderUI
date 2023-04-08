const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('./helper/basicSetup'),
        app         = require('../index');

describe('POST: /login route to login user', ()=>{
    basicSetup();         // imported from test/helpers/basicSetup.js
  
    it('valid data', (done)=>{            // test case 1
        let toSendData = {userName:'shreyas', password: '123'} 
        request(app).post('/login')
            .send(toSendData)
            .then((res)=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body.message).to.equal("login sucess");
                done();
            })
            .catch((err) => done(err))
    })

    it('incorrect data', (done)=>{        // test case 2
        request(app).post('/login')
            .send({userName:'shreyas', password: '1234'})
            .then((res)=>{
                expect(res.statusCode).to.equal(201)
                expect(res.body.message).to.equal("wrong credentials")
                done()
            })
            .catch((err) => done(err))
    })

    it('no user exists', (done)=>{        // test case 3
        request(app).post('/login')
            .send({userName:'1234', password: '1234'})
            .then((res)=>{
                expect(res.statusCode).to.equal(202)
                expect(res.body.message).to.equal("notRegistered")
                done()
            })
            .catch((err) => done(err))
    })
})