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
            fullname: credentials.name,
            email: credentials.email,
            department : credentials.department,
            level : credentials.level,
            username : credentials.username,
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
    async jwt({ token, user , session }) {
      console.log(
        "JWT CALLBACK || ",
        "token=",
        token,
        " || user=",
        user ? user : "No user",
        "session=",
        session ? session : "No session"
      );
      // if (user) {
      //   return {
      //     ...token,
      //     id: user.id,
      //     fullname: user.fullname,
      //     username : user.username
      //   };
      // }
      return token;
    },
    async session({ session,token, user  }) {
      // session.user.email = token.email
      // session.user.name = token.name
      session.user.id = token.id
      console.log(
        "SESSION CALLBACK",
        "user=",
        user ,
        "session=",
        session ? session : "No session"
      );
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
      console.log(profile)
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
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
