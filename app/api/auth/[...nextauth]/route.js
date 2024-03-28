import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import {connect} from "@/dbConnection/dbConnect";
import User from "@/modals/userModal";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks:{
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.image = user.image;
                token.name = user.name;
            }
            return token;
        },

        async session({session, token}) {
            console.log("Token: ",token)
            // console.log("Session: ",session)
            // console.log("Token: ",token)
            return session
        },
        async signIn({user, account, profile}) {


            try{
                await connect();
                let userExists = await User.findOne({email: user.email});
                if(!userExists){
                    userExists = await User.create({
                        name: user.name,
                        email: user.email,
                        username: await User.findOne({username:user.email.split("@")[0]}) ? user.email.split("@")[0] + Math.floor(Math.random() * 1000) : user.email.split("@")[0],
                        avatar: user.image,
                    });
                }


                user.id=userExists._id;
                user.username=userExists.username;
                user.isAdmin=userExists.isAdmin;
                user.image=userExists.avatar;
                user.name=userExists.name;

                return user;

            }catch (e) {
                console.log("Error while creating user: ",e)
                return false;
            }





        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
