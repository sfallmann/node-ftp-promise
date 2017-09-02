'use strict';
const {FtpSrv} = require('ftp-srv');
let localhost = '127.0.0.1';
if (process.env.NODE_ENV){
  localhost = '0.0.0.0';
}
const ftpServer = new FtpSrv(`ftp://${localhost}:3000`,{pasv_range: '8800-8999', greeting: 'Welcome - FTP Test Server'});

ftpServer.on('client-error', ({connection, context, error}) => { console.log(context,error);});
ftpServer.on('login', (data, resolve, reject) => {
  return resolve();
});

module.exports = {
  run: () => {
    console.log('Starting FTP Server:');
    ftpServer.listen()
    .then(() => {
      console.log('\n');
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
  }
}