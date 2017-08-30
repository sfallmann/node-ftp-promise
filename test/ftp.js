const {FtpSrv, FileSystem} = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://127.0.0.1:21',{pasv_range: '8888-8900'});
const fs = require('fs');
const {FTP} = require('../index');

const ftpClient = new FTP();

ftpServer.on('client-error', ({connection, context, error}) => { console.log(context,error);});
ftpServer.on('login', (data, resolve, reject) => {
  return resolve();
});

ftpServer.listen()
.then(()=>{

})
.catch(console.log);

ftpClient.connect({host:'127.0.0.1', user:'username', password:'password'})
.then(() => {
  return ftpClient.put('text', 'text.txt');
})
.then((res) => {
  console.log(res);
})
.then(() => {
  ftpClient.list()
})
.then(console.log)
.catch(console.log);
