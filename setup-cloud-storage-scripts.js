const fs = require('fs-extra');


fs.copy('./cloud-storage' ,'./electron/dist/')
.then(() => console.log('Files copied successfully!'))
.catch(err => console.error(err));