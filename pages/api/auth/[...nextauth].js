import axios from 'axios'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      async authorize(crendetials) {
        const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, crendetials)

        const user = res.data

        if(user) {
          return user
        } else {
          throw '/auth/signin?i=1'
        }
      }
    })
  ],

  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_TOKEN,
  },

  callbacks: {
    async jwt (token, user) {
      if(user){
        token.uid = user._id
      }

      return Promise.resolve(token)
    
    },

    async session(session, user) {
      session.userId = user.uid
      return session
    }
  },

  database: process.env.MONGODB_URI,

})