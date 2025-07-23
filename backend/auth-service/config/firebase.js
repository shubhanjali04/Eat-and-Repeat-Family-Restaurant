import admin from 'firebase-admin'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import serviceAccount from '../firebase/eat-app-auth-firebase-adminsdk-fbsvc-8622dc1eae.json' assert {type:'json'}


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

admin.initializeApp({
 credential:admin.credential.cert(serviceAccount),
})

export default admin