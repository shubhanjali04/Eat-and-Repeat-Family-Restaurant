import admin from 'firebase-admin'

// firebase Registration/Login controller
export const firebaseLogin = async (req,res) => {
    try {
        const{idToken} = req.body

        if(!idToken) {
            return res.status(400).json({message:'Firebase ID token is required'})
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken)
        const { uid, email, name, picture } = decodedToken

        try {
            await axios.post('http://user-service:8000/api/user/create',{
                name,
                email,
            })
        } catch (error) {
            console.error('Error saving to user-service', error.message)
        }
        res.status(200).json({
            message:'Firebase login successful',
            user: { uid, email, name, picture }
        })
    } catch (error) {
        console.error('Firebase token verify error:',error.message)
        res.status(401).json({message:'Invalid or expired Firebase Id'})
    }
}