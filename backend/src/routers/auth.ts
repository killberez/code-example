import express from 'express'
import UserDocument from '../models/user'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res, next) => {
  const CLIENT_ID =
    '550890630184-gbs9q4c0viqr2nmt2n04c08momogpht2.apps.googleusercontent.com'

  const client = new OAuth2Client(CLIENT_ID)
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (payload) {
      console.log(payload)
      console.log(req.body.googleId)
      console.log(UserDocument)
      const googlePayload = payload
      const user = await UserDocument.findOne({
        googleId: payload.sub,
      }).exec()

      console.log(payload.sub)

      if (user) {
        const token = jwt.sign({ id: user.id }, 'privatekey')
        res.json({ email: user.email, token })
      } else {
        console.log('New')
        const newUser = await UserDocument.create({
          email: googlePayload.email,
          firstName: googlePayload.given_name,
          lastName: googlePayload.family_name,
          googleId: googlePayload.sub,
        })
        newUser.save()
        const token = jwt.sign({ id: newUser.id }, 'privatekey')
        res.json({ email: newUser.email, token })
      }

      //   router.get('/', async (req, res, next) => {
      //     jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
      //         if(err){
      //             //If error send Forbidden (403)
      //             console.log('ERROR: Could not connect to the protected route');
      //             res.sendStatus(403);
      //         } else {
      //             //If token is successfully verified, we can send the autorized data
      //             res.json({
      //                 message: 'Successful log in',
      //                 authorizedData
      //             });
      //             console.log('SUCCESS: Connected to protected route');
      //         }
      //     })
      // });
      // if(!user){
      //     const newUser = await UserDocument.create({
      //       email: userInfo.email,
      //       firstName: userInfo.given_name,
      //       lastName: userInfo.family_name,
      //       gooogleId: req.body.userId
      //     })
      //     res.json(newUser)
      // }
    }
  }
  await verify().catch(console.error)
})

export default router
