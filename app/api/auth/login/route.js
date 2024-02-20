import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
// import { compare } from "bcrypt";
// import bcrypt from 'bcrypt'

async function login(credentials) {
  try {
    await connectToDB();
    console.log('credentials =' , credentials)
    const user = await User.findOne({ email: credentials.email });
    // console.log('user =' , user)
    if (!user) {
      console.log("User not found with email:", credentials.email);
      return null;
    }
    const isCorrect = credentials.password = user.password;
    console.log('isscorrect' , isCorrect)
    if (!isCorrect) {
      console.log("Incorrect password for user:", user.email);
      return null;
    }
    return user;
  } catch (error) {
    console.error("Error during login:", error.message);
    return null;
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log('cred user = ' ,user)
          if (!user) {
            console.log("Login failed with credentials:", credentials);
            return null;
          }
          console.log("User logged in:", user.email);
          return user;
        } catch (error) {
          console.error("Error during authorization:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log(user)
        return {
          ...token,
          id: user.id,
          email: user.email,
          fullname : user.fullname,
          username : user.username,
          level: user.level,
          department : user.department
        };
      }
      // console.log('token =' , token)
      return token;
    },
    async session({ session, token }) {
      console.log('session =' , session)
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.fullname,
          username: token.username,
          level: token.level,
          department: token.department
        },
      };
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
});

export { handler as GET, handler as POST };