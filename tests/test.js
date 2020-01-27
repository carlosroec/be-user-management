import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import UserModel from '../src/models/user';

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({})
    });

    describe('POST AUTH /signup', async () => {
        it('Shoud register a user', (done) => {
            const user = {"name":"test user ONE", "username": "imtheone", "email":"testONE@a.com", "password":"123", "usergroup": "xxxx"};
            const usergroup = {"name": "groupA"};

            chai.request(app)
                .post('/api/usergroup/add')
                .send(usergroup)
                .end((err, res) => {
                    const usergroupID = res.body.usergroup._id;
                    user.usergroup = usergroupID;

                    chai.request(app)
                        .post('/api/auth/signup')
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.property('user');
                            res.body.should.have.property('token');

                            done();
                        });
                })
        });
    });

    describe('POST AUTH /signin', async () => {
        it('Should get the token and user', (done) => {
            const user = {"name":"test user ONE", "username": "imtheone", "email":"testONE@a.com", "password":"123", "usergroup": "xxxx"};
            
            chai.request(app)
                .post('/api/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('token');

                    chai.request(app)
                        .post('/api/auth/signin')
                        .send({"email":"testONE@a.com","password":"123"})
                        .end((err, res) => {
                            console.log("aa: ", res.body);
                            done();
                        });
                });

            
        });
    });

    describe('GET USERS /me', async () => {
        it('Should get the current user', (done) => {
            const user = {"name":"test user ONE", "username": "imtheone", "email":"testONE@a.com", "password":"123", "usergroup": "xxxx"};
            const usergroup = {"name": "groupA"};

            chai.request(app)
                .post('/api/usergroup/add')
                .send(usergroup)
                .end((err, res) => {
                    const usergroupID = res.body.usergroup._id;
                    user.usergroup = usergroupID;

                    chai.request(app)
                        .post('/api/auth/signup')
                        .send(user)
                        .end((err, res) => {
                            res.should.have.status(201);
                            res.body.should.be.a('object');
                            res.body.should.have.property('user');
                            res.body.should.have.property('token');
        
                            chai.request(app)
                                .post('/api/auth/signin')
                                .send({"email":"testONE@a.com","password":"123"})
                                .end((err, res) => {
                                    const token = res.body.token;
        
                                    chai.request(app)
                                        .get('/api/users/me')
                                        .set('Authorization', `Bearer ${token}`)
                                        .end((err, res) => {
                                            console.log("done");
                                            done();
                                        });
                                });
                        });
                });
        })
    });
});
