Add the Firebase Admin SDK
===

Add Firebase to your app
===
1. If you don't already have a Firebase project, add one in the **Firebase console**. The **Add project** dialog also gives you the option to add Firebase to an existing Google Cloud Platform project.

2. Navigate to the **`Service Accounts`** tab in your **project's settings** page.

3. Click the **`Generate New Private Key`** button at the bottom of the Firebase Admin SDK section of the Service Accounts tab.

```
npm install firebase-admin --save
```

Add the SDK
===
next add follwoing command into your **`service`** class
```
import * as admin from 'firebase-admin';
```

Initialize the SDK
===
```
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: '<PROJECT_ID>',
    clientEmail: 'foo@<PROJECT_ID>.iam.gserviceaccount.com',
    privateKey: '-----BEGIN PRIVATE KEY-----\n<KEY>\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});
```