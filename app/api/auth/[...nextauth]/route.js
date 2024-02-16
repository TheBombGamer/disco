import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Crypto", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          const userExists = await User.findOne({ email: credentials.email });
          if (userExists) {
            console.log(`User with this email  already exists`);
            return null;
          }

          const newUser = await User.create({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          });

          console.log("New user created successfully", newUser);
          return newUser;
        } catch (error) {
          console.error("Error during authentication:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log(
        "JWT CALLBACK || ",
        "token=",
        token,
        " || user=",
        user ? user : "No user",
        "session=",
        session ? session : "No session"
      );
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session,token, user  }) {
      // session.user.email = token.email
      // session.user.name = token.name
      session.user.id = token.id
      console.log(
        "SESSION CALLBACK",
        "token=",
        token,
        "user=",
        user ? user : "No user",
        "session=",
        session ? session : "No session"
      );
      return session;
    },
    secret: process.env.NEXTAUTH_SECRET,

  },
});
export { handler as GET, handler as POST };
