const { throws } = require('assert');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "type": "service_account",
        "project_id": "gigworks-desktop",
        "private_key_id": "aa40f8fd8b39c3584ca26bc603c89b7db7cc2700",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXE0SmIuitSLS4\nFPFiVYvG9TMAyqWITrWb37wONCLDrogRZ0ipWguHnQd3YkhooAgjMLrQgknYkMwQ\nGM4tqJ5nugBTzElMajzwohFXvHkGm7Y1wN5wtsQhxeOEcahxhSruXyZbetLzC0mm\n4gz8ipFJ8xwIGhCbNOy0YgT7qn8jQ/t5LPVrJNy9YdByn77eSkk4ouS4Z/y/553r\nXqTtl/KzYKgx5QTUbK3jLJ7KSKxMhysIq2bLNZe8gA0nyx1HSdd1kcjZHgFwfWpo\nb5fLrRpW11O54DgNI5NwYnA67gdrZ/Bd8fgboyiWuKf1M/LuFdNEq+TPxy54eMsJ\nCFkuZ891AgMBAAECggEADpSpqFPahg2W149kjqY3/oSgHrWa4qbKE1hgHjTSSCA6\nT10FtRvqMfVUs6UqMjgudjWtShN7t2meME2HP1PfWfPTNUM/Ax+GcH5hKHPEcIAA\ncXwDBqOKbBddHTrE/ukohWdshyFkZlhStvG+lB8hj5664rNKoq1/IkJgPb6CVRpZ\nXYoRSP6TglEfUd4iliyKQJcU0nfYbCoCfmxDcHtlZKT5MgmPVPCMIyWn3NMNbO3g\nVAA92EOxzquM1H5tslQusTtDmyDpsHZS65Qb3rMR/3SSn6+gxxiaMeI8U2UOI3/j\n1zKWGFsJJfrpUCwLM+RSRW1jgZ6KEc2VPCodzOP9jwKBgQDSoYh9YUILdR/1H4FZ\nk0PqPsbNR2m7bIcy/G2RmxyVIhC58Jpvd0S6AGu1Mgi7QStpL4yOjctTkrODaX6z\nD3uDZ6T6s7iRgUGz3ss1QjkMfJmQa8mShiidV/GefgD71Pnq4HGY3t+mlf1Q3Itd\npnq1mlCPm4whKv7zZUYlSiieLwKBgQC3ncFEFrVI89TdDwY6btF+5bskpatIX9ha\nkI3vYrD77lhqky25fjbPW4cAamrR0evisL0mBcGM93S+rjoWGPF6fnS1HiMkh/qO\nTfFjKJVC26DDlal1P0KFDCqoPatejH4P42jHG4el0i9mG8ffvw/M5dUc3W1dtYiB\nb2YkF99HmwKBgEnSFV0kDhqn5Rhq/1GenGnnsJNXmQX4JnZHJDuo6l6WPth8LBQu\n7+ZkqVsq+wZt88H8yT1ZEs7qloHTInWtUnOeiqLXBDPy4k0hI4U5/XaT4NpN/Kqe\n3HMw1Fzg+oVIgoLAQO/8BNSEsvB5K1saMt2dBOkf8f/Z6trxPqFpGU0/AoGAfnjt\nxw1xHue8ZetUWek86ZApYCuwl/BUoMTSzuGGkHDye64Wn568+ATOL04dd5qFRKaC\nEm+CiqtjwXdWUSQrKDlz/9DbWe1DesNbEfbBIMUQrccnargBBI2F0E5x/HT+28jC\nwepHe8MTnNxjxszegD6KlRA7pYFFngnyK8g5piMCgYAGI2/RQ3bcNGM9l6MVzRVy\nG4qJrsYPfMQpsx+mWDXHe9QUSM8/zC0ADLkzCMNMe1E48u2Ti+BtlJIo4gqI2shR\n9UqVdd7wGTtHkpGBgKRPy2QzUn9xLLADfvJZDx1ZdcRrgyslzsdojdCR8Fua3IGT\nepY1GgW5Ir8vVRXolj6TLQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-hc26u@gigworks-desktop.iam.gserviceaccount.com",
        "client_id": "104108239557377097279",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hc26u%40gigworks-desktop.iam.gserviceaccount.com"
      }),
});


function uploadToFirebase(filename, path, extension, user_id){
    const destination = extension ==='.txt' ? `/uploads/${user_id}/txt` :`/uploads/${user_id}/img`;
    const storageRef = admin.storage().bucket('gs://gigworks-desktop.appspot.com');
    storageRef.upload(path, {
        public: true,
        destination: `${destination}/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    }).then(data => {
        fs.unlink(path, ()=> {
            return
        })
    }).catch(
        err => console.log(err)
    )


}

async function uploadFiles( user_id, userdata_path){
    let filePath = `${userdata_path}/gigworks`;
    fs.access(filePath, (error)=> {
        if (error){
            fs.mkdir(filePath)
        } else {
            fs.readdir(filePath, (err, files) => {
                if(!error){
                    if (files.length == 0) return;

                    files.forEach(async (val) => {
                       let basename = path.basename(val);
                       let extension = path.extname(val);
                       await uploadToFirebase(basename,`${filePath}/${val}`, extension, user_id)
                    })
                }
            });
        }
    })
}

process.on('message', (msg) => {
    const { id , path} = msg;
    cron.schedule('* * * * *', () => {
        uploadFiles(id, path);
    })
})