'use strict';
const expect = require('chai').expect;
const {FTP} = require('../index');
const testServer = require('../test-server/test-server');

const ftpClient = new FTP();

let localhost = '127.0.0.1';
if (process.env.NODE_ENV){
  localhost = '0.0.0.0';
}

const clientConfig = {host:localhost, user:'username', password:'password', port:3000};
const eventConfig = {
  ready: () => {console.info('do something on ready')},
  greeting: (msg) => {console.log(msg)},
  end: () => {console.info('do something on end')},
  close: (hadErr) => {console.info(`do something on close`)},
  error: (err) => {console.error(err)},
};

testServer.run();

describe('connect', () => {
  it('should connect successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();
      });
  });
});

describe('mkdir', () => {
  it('should mkdir successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.mkdir('MyFolder/', false, true);
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();
      });
  });
});

describe('cwd', () => {
  it('should cwd successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.cwd('MyFolder/');
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();
      });
  })
});

describe('put', () => {
  const getTime = () => {
    return new Date().getTime().toString();
  }
  it('should put files successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.cwd('MyFolder/');
      })
      .then(() => {
        const files = [];
        for (let i = 0; i < 5; i++){
          files.push(ftpClient.put(`Text: ${getTime()}`, `File ${i}.txt`));
        }
        return Promise.all(files);
      })
      .then((res) => {
        res.forEach((file) => {
          expect(file.status).to.equal('success');
        });
        ftpClient.end();
        ftpClient.destroy();
        done();
      })
      .catch(done);      
  });
});

describe('get', () => {
  const getTime = () => {
    return new Date().getTime().toString();
  }
  it('should get file successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.cwd('test');
      })
      .then((res) => {
        return ftpClient.get('testimg.jpg');
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();        
      })
      .catch(done);
  })
});

describe('list', () => {
  it('should get file successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.list('test/');
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        expect(res.list).to.contain.lengthOf(2);
        ftpClient.end();
        ftpClient.destroy();
        done();        
      })
      .catch(done);
  })
});

describe('rmdir', () => {
  it('should rmdir successfully', (done) => {

    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.rmdir('MyFolder/', true);
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();
      })
      .catch(done);
  })
});