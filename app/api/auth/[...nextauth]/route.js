import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    //  session: {
    //   strategy: "jwt",
    // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: { label: "Crytpo", type: "text" },
    //     email: { label: "email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },

    //   async authorize(credentials) {
    //     console.log("credentials: ", credentials);
    //     try {
    //       await connectToDB();

    //       console.log("Checking for existing user...");

    //       const existingUser = await User.findOne({
    //         username: credentials.username,
    //       });

    //       if (existingUser) {
    //         console.log("User with this Username already exists");
    //         return new Response(
    //           "error: User with this Username already exists",
    //           {
    //             status: 400,
    //           }
    //         );
    //       }

    //       console.log("Creating a new user...");

    //       const newUser = await User.create({
    //         username: credentials.username,
    //         email: credentials.email,
    //       });

    //       console.log
    //       await newUser.save();

    //       console.log("User created successfully", newUser);
    //       return true;
    //     } catch (error) {
    //       console.error("Error during signup:", error.message);
    //     }
    //     return null;
    //   },
    // }),
  ],
  callbacks: {
 
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      console.log('session  =' , session)

      return session;
    },
    // async jwt({ token, user, session }) {
    //   // console.log(
    //   //   "JWT CALLBACK",
    //   //   "token=",
    //   //   token,
    //   //   "user=",
    //   //   user,
    //   //   "session=",
    //   //   session , 'JWT PART ENDED ---------------'
    //   // );
    //   if (user) {
    //     return {
    //       ...token,
    //       id: user.id,
    //       name: user.username,
    //     };
    //   }
    //   return token;
    // },
    // async session({ token, user, session }) {
    //   // console.log(
    //   //   "SESSION CALLBACK",
    //   //   "token=",
    //   //   token,
    //   //   "user=",
    //   //   user,
    //   //   "session=",
    //   //   session
    //   // );
    //   return {
    //     ...session,
    //     user: {
    //       id: token.id,
    //       name: token.name,
    //     },
    //   };
    //   // return session;
    // },
    // secret: process.env.NEXTAUTH_SECRET,
    // session: {
    //   strategy: "jwt",
    // },
    async signIn({ account, profile, user, credentials }) {
      console.log(credentials)
      console.log(profile)
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email || credentials.email });
        if (userExists) {
          console.log("user already exists");
        }

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name ,
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
