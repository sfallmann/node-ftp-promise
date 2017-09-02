'use strict';
const ftplib = require('ftp');

class FTP{
  constructor(){
    this.client = new ftplib();

  }

  connect(config, events) {
    return new Promise((resolve, reject) => {
      const msg = {
        status: 'success',
        command: 'connect'
      };

      if(events){
        Object.keys(events).forEach((key) => {
          this.client.on(key, events[key]);
        });      
      }

      this.client.on('ready', () => {
        resolve(msg);
      });

      this.client.connect(config);
    });
  }

  list(path) {
    return new Promise((resolve, reject)=>{
      this.client.list(path, (error, list)=>{
        if (error){
          reject({
            status: 'error',
            command: 'list',
            error, 
            list
          });
        }
        resolve({
          status: 'success', 
          command: 'list',
          list
        });
      });
    });
  }

  binary() {
    return new Promise((resolve, reject)=>{
      this.client.binary((error)=>{
        if (error){
          reject({
            status: 'error',
            command: 'binary',
            error
          });
        }
        resolve({
          status: 'success', 
          command: 'binary'
        });
      });
    });
  }  

  mkdir(dirname, ignore, recursive) {
    return new Promise ((resolve, reject) => {
      this.client.mkdir(dirname, recursive, (error)=>{
        if (error){
          if (ignore){
            resolve({
              status: 'error(ignore)',
              command: 'mkdir',
              error,
            });
          }
          reject({
            status: 'error',
            command: 'mkdir',
            error
          });
        }
        resolve({
          status: 'success',
          command: 'mkdir',
          dirname
        });
      });
    })
  }

  rmdir(dirname, recursive) {
    return new Promise ((resolve, reject) => {
      this.client.rmdir(dirname, recursive, (error)=>{
        if (error){
          reject({
            status: 'error',
            command: 'rmdir',
            error
          });
        }
        resolve({
          status: 'success',
          command: 'rmdir',
          error
        });
      });
    })
  }

  cwd(dirname) {
    return new Promise((resolve, reject)=>{
      this.client.cwd(dirname, (error)=>{
        if (error){
          reject({
            status: 'error',
            command: 'cwd',
            error
          });
        }
        return resolve({
          status: 'success',
          command: 'cwd',
          dirname
        });
      });
    });
  }

  put(data, filename, useCompression) {
    return new Promise((resolve, reject) => {
      this.client.put(data, filename, useCompression, (error)=>{
        if (error){
          reject({
            status: 'error',
            command: 'put',
            error
          });
        }
        resolve({
          status: 'success',
          command: 'put',
          filename
        });
      });
    })
  }

  get(path, compression) {
    return new Promise((resolve, reject) => {
      this.client.get(path, (error, stream)=>{

        if (error){
          reject({
            status: 'error',
            command: 'get',
            error
          });
        }
        resolve({
          status: 'success',
          command: 'get',
          file: {
            name: path,
            stream
          }
        });
      });
    })
  }  

  end(){
    this.client.end();
  }

  destroy() {
    this.client.destroy();
  }
}

module.exports = {
  FTP
};
