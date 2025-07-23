import admin from 'firebase-admin'

// Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {

    const idToken = req.headers.authorization?.split("Bearer")[1]

    if(!idToken) {
        return res.status(401).json({message:"Access Token Missing"})
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken
        next()
    } catch (error) {
        console.error("Firebase Token verify failed:",error.message)
        return res.status(401).json({message:"Invalid or expired token"})
    }
}

export default verifyFirebaseToken
