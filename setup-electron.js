const fs = require('fs-extra');
  
fs.copy('./dist/gigworks-desktop/' ,'./electron/dist/')
.then(() => console.log('Files copied successfully!'))
.catch(err => console.error(err));