const ftplib = require('ftp');

class FTP{
  constructor(){
    this.client = new ftplib();

  }

  connect(options) {

    return new Promise((resolve, reject) => {
      this.client.on('error',(e) => {
        return reject(e);
      });    
      this.client.connect(options);
      this.client.on('ready',() => {
        return resolve('ftp client ready');
      })

    })
  }

  list() {
    return new Promise((resolve, reject)=>{
      this.client.list((list, error)=>{
        if (error){
            return reject(error);
        }
        return resolve(list);
      });
    });
  }

  mkdir(dirname, ignore) {
    return new Promise ((resolve, reject) => {
      this.client.mkdir(dirname, (error)=>{
        if (error){
          if (error.message === 'Cannot create a file when that file already exists.' && ignore){
            return resolve(`directory named ${dirname} already exists`);
          }
          return reject(error);
        }
        return resolve(`${dirname} folder created`);
      });
    })
  }

  cwd(dirname) {
    return new Promise((resolve, reject)=>{
      this.client.cwd(dirname, (error)=>{
        if (error){
            return reject(error);
        }
        return resolve(`changed wordking dir to ${dirname}`);
      });
    });
  }

  put(data, filename) {
    return new Promise((resolve, reject)=>{
      this.client.put(data, filename, (error)=>{
        if (error){
            return reject(error);
        }
        return resolve(`${filename} transferred`);
      });
    });
  }

  destroy() {
    this.client.destroy();
  }
}

module.exports = {
  FTP
};
