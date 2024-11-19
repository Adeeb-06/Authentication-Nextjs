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
            if (account.provider === "google") {
                await connectToMongoDb();

                const existingUser = await User.findOne({ email: user.email });
                if (!existingUser) {
                    // If the user does not exist in the database, create a new user
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        password: generateStrongPassword(), // Password is not applicable for Google users
                        role: "user",
                    });
                    await newUser.save();
                }
            }
            return true;
        },
        async session({ session, token }) {
            // Attach MongoDB User ID to the session
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.id = dbUser._id;
                session.user.role = dbUser.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
};

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }