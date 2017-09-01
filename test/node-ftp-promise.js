const expect = require('chai').expect;
const {FTP} = require('../index');
const testServer = require('../test-server/test-server');

const ftpClient = new FTP();
const clientConfig = {host:'127.0.0.1', user:'username', password:'password'};
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
        return ftpClient.mkdir('All Folders/MyFolder/', false, true);
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
        return ftpClient.cwd('All Folders/MyFolder/');
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
        const files = [];
        for (let i = 0; i < 5; i++){
          files.push(ftpClient.put(`Text: ${getTime()}`, `All Folders/MyFolder/File ${i}.txt`));
        }
        return Promise.all(files);
      })
      .then((files) => {
        files.forEach((file) => {
          expect(file.status).to.equal('success');
        });
        ftpClient.end();
        ftpClient.destroy();
        done();
      });
  });
});

describe('rmdir', () => {
  it('should rmdir successfully', (done) => {
    ftpClient.connect(clientConfig)
      .then(() => {
        return ftpClient.cwd('../');
      })
      .then(() => {
        return ftpClient.rmdir('All Folders', true);
      })
      .then((res) => {
        expect(res.status).to.equal('success');
        ftpClient.end();
        ftpClient.destroy();
        done();
      });
  })
});

