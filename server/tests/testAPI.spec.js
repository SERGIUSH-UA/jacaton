//During the test the env variable is set to test
require('dotenv').config({path:'./tests/.env'});
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
const {Answer, User, Question, Team, Game} = require("../models/models");
let should = chai.should();


chai.use(chaiHttp);

console.log('API tests starting....')

//Our parent block
describe('Global MODELS',  () => {
    before(  (done) => { //Before test we must run server!
       done();
    });

    describe('USER',  () => {

        it('Clear table', async () => {
            await User.destroy({where:{}})
            const users = await User.findAll()
            users.should.be.a('array');
            users.length.should.be.eql(0)
        });
    });

    describe('ANSWER',  () => {

        it('Clear table', async () => {
            await Answer.destroy({where:{}})
            const answers = await Answer.findAll()
            answers.should.be.a('array');
            answers.length.should.be.eql(0)
        });
    });

    describe('QUESTION',  () => {

        it('Clear table', async () => {
            await Question.destroy({where:{}})
            const questions = await Question.findAll()
            questions.should.be.a('array');
            questions.length.should.be.eql(0)
        });
    });

    describe('TEAM',  () => {

        it('Clear table', async () => {
            await Team.destroy({where:{}})
            const teams = await Team.findAll()
            teams.should.be.a('array');
            teams.length.should.be.eql(0)
        });
    });

    describe('GAME',  () => {

        it('Clear table', async () => {
            await Game.destroy({where:{}})
            const games = await Game.findAll()
            games.should.be.a('array');
            games.length.should.be.eql(0)
        });
    });

});

//Our parent block
describe('Global /API',  () => {
    before(  (done) => { //Before test we must run server!
         server.on( "app_started", function()
        {
            console.log('Server emit start ==> Done()')
            done()
        })
    });

    describe('/USER',  () => {
        const request =  chai.request;
        it('/AUTH it should GET check Wrong   400 error', async () => {
            await request(server)
                .get('/api/user/auth')
                .then((res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql('ID is required');
                }).catch((e) => {throw e});
        });
        it('/AUTH?id=5 it should GET check Success', async () => {
            await request(server)
                .get('/api/user/auth?id=5')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });
        it('/REGISTRATION it should POST check Success', async () => {
            await request(server)
                .post('/api/user/registration')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });
        it('/LOGIN it should POST check Success', async () => {
            await request(server)
                .post('/api/user/login')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });
    });

    describe('/GAME',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/game')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Close and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/game').send()
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/game/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            resA.body.active.should.be.eql(true);
                            await request(server).patch(`/api/game/close/${id}`).send()
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.message.should.be.eql('Game closed!');
                                    await request(server).delete(`/api/game/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/game/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });

    describe('/QUESTION',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/question')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/question').send({title: 'Test', description: 'Test descr', answer: 'tEsT'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/question/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/question/${id}`).send({description: 'Test descr patch'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.description.should.be.eql('Test descr patch');
                                    await request(server).delete(`/api/question/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/question/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });

    describe('/ANSWER',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/answer')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/answer').send({body: 'Test'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/answer/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/answer/${id}`).send({body: 'Test descr patch'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.body.should.be.eql('Test descr patch');
                                    await request(server).delete(`/api/answer/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/answer/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });

    describe('/TEAM',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/team')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/team').send({name: 'Test 2', city: 'Kyiv', img: './static/img/img.jpg',
                    parish: 'Матері Божої Ангельської'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/team/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/team/${id}`).send({city: 'Вінниця'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.city.should.be.eql('Вінниця');
                                    await request(server).delete(`/api/team/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/team/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });

});

//Our parent block
describe('SIMULATE USER ACTIVITY',  () => {
    before(  (done) => { //Before test we must run server!
        done()
    });

    describe('ACCOUNT',  () => {
        const request =  chai.request;
        it('REGISTRATION check Error', async () => {
            await request(server)
                .post('/api/user/registration')
                .then((res) => {
                    res.should.not.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(false);
                }).catch((e) => {throw e});
        });
        it('REGISTRATION check Success', async () => {
            await request(server)
                .post('/api/user/registration')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });
        it('/LOGIN it should POST check Error', async () => {
            await request(server)
                .post('/api/user/login')
                .then((res) => {
                    res.should.not.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(false);
                }).catch((e) => {throw e});
        });
        it('/LOGIN it should POST check Success', async () => {
            await request(server)
                .post('/api/user/login')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });
        it('/AUTH?id=1 it should GET check Success', async () => {
            await request(server)
                .get('/api/user/auth?id=1')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql(true);
                }).catch((e) => {throw e});
        });

    });

    describe('START GAME',  () => {
        const request =  chai.request;
        it('Not any games', async () => {
            await request(server)
                .get('/api/game')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0)
                }).catch((e) => {throw e});
        });
        it('Create and check game', async () => {
            await request(server)
                .post('/api/game').send()
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/game/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            resA.body.active.should.be.eql(true);
                        })
                }).catch((e) => {throw e});
        });
    });

    describe('ADD QUESTION FOR A GAME',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/question')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/question').send({title: 'Test', description: 'Test descr', answer: 'tEsT'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/question/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/question/${id}`).send({description: 'Test descr patch'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.description.should.be.eql('Test descr patch');
                                    await request(server).delete(`/api/question/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/question/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });


    describe('CREATE TEAM',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/team')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/team').send({name: 'Test 2', city: 'Kyiv', img: './static/img/img.jpg',
                    parish: 'Матері Божої Ангельської'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/team/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/team/${id}`).send({city: 'Вінниця'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.city.should.be.eql('Вінниця');
                                    await request(server).delete(`/api/team/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/team/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });


    describe('SEND ANSWER',  () => {
        const request =  chai.request;
        it('/ it should GET check Success', async () => {
            await request(server)
                .get('/api/answer')
                .then((res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                }).catch((e) => {throw e});
        });
        it('/ it should POST, then GET by ID, then Patch and Delete by ID, check Deleting must be Success', async () => {
            await request(server)
                .post('/api/answer').send({body: 'Test'})
                .then(async (res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    const id = res.body.id;
                    await request(server).get(`/api/answer/${id}`)
                        .then(async (resA) => {
                            resA.should.have.status(200);
                            resA.body.should.be.a('object');
                            resA.body.id.should.be.eql(id);
                            await request(server).patch(`/api/answer/${id}`).send({body: 'Test descr patch'})
                                .then(async (resB) => {
                                    resB.should.have.status(200);
                                    resB.body.should.be.a('object');
                                    resB.body.body.should.be.eql('Test descr patch');
                                    await request(server).delete(`/api/answer/${id}`).send()
                                        .then(async (resC) => {
                                            resC.should.have.status(200);
                                            resC.body.should.be.a('object');
                                            resC.body.message.should.be.eql(true);
                                            await request(server).get(`/api/answer/${id}`)
                                                .then(async (resD) => {
                                                    resD.should.have.status(204);
                                                })
                                        })
                                })
                        })
                }).catch((e) => {throw e});
        });
    });

});
