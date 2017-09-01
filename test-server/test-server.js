const {FtpSrv} = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://127.0.0.1:21',{pasv_range: '8800-8999', greeting: 'Welcome - FTP Test Server'});

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