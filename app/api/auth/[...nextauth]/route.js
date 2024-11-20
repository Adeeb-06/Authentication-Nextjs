import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToMongoDb from "@/libs/mongodb";
import User from "@/models/User";
function generateStrongPassword(length = 30) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:',.<>?";
    let password = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    // const hashedpassword = bcrypt.hash(password , 10)
    return password;
  }

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "xyz@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToMongoDb();
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("User not found");
                }
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }
                return user;
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {

            await connectToMongoDb()
            if (account.provider === "google") {
                await connectToMongoDb();
                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    // If the user does not exist in the database, create a new user
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        password: generateStrongPassword(), // Password not applicable for Google users
                        role: "user",
                    });
                    await newUser.save();
                }
            }
            if(account.provider === "credentials"){
                const dbUser = await User.findOne({ email: user.email });
                if(dbUser){
                    user.role =dbUser.role
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
              // Add id and role from the user object to the token
              token.id = user._id || user.id || null;
              token.role = user.role || "user"; // Default role if undefined
            } else if(!token.role){
                await connectToMongoDb();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    token.role = dbUser.role || "user";
                    token.id = dbUser._id.toString();
                }
            }
            console.log("JWT Callback - Final Token:", token); // Debug
            return token;
          },          
          async session({ session, token }) {
            if (token) {
              session.user.id = token.id || null;
              session.user.role = token.role || "user"; // Default role if undefined
            }
            console.log("Session Callback - Final Session:", session); // Debug
            return session;
          },          
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
};

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }