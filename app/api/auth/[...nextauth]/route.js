import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";

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
    const isCorrect = credentials.password === user.password;
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
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "name", type: "text" },
        fullname: { label: "fullname", type: "text" },
        department: { label: "department", type: "text" },
        level: { label: "level", type: "number" },
        email: { label: "email", type: "email" },
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

          const user = await User.create({
            fullname: credentials.name,
            email: credentials.email,
            department: credentials.department,
            level: credentials.level,
            username: credentials.username,
            password: credentials.password,
            image : credentials.image
          });

          console.log("New user created successfully", user);
          return user;
        } catch (error) {
          console.error("Error during authentication:", error.message);
          return null;
        }
      },
    }),

    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       const user = await login(credentials);
    //       console.log('cred user = ' ,user)
    //       if (!user) {
    //         console.log("Login failed with credentials:", credentials);
    //         return null;
    //       }
    //       console.log("User logged in:", user.email);
    //       return user;
    //     } catch (error) {
    //       console.error("Error during authorization:", error.message);
    //       return null;
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT CALLBACK || ", "token=", token, " || user=", user);
      if (user) {
        return {
          ...token,
          id: user.id,
          fullname: user.fullname,
          username: user.username,
          department: user.department,
          level: user.level,
          image : user.image
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      // session.user.email = token.email
      session.user.name = token.fullname,
      session.user.id = token.id,
      session.user.department = token.department,
      session.user.level = token.level,
      session.user.username = token.username,
      session.user.image = token.image,


      // session.user = token
      console.log(
        "SESSION CALLBACK",
        "session=",
        session ? session.user : "No session"
      );
      // if (user) {
      //   return {
      //     ...session,
      //     user: {
      //       ...session.user,
      //       department: token.department,
      //       fullname: token.fullname,
      //       level: token.level,
      //     },
      //   };
      // }
      return session;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
});
export { handler as GET, handler as POST };
