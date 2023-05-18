/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 15:04:25
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 21:45:10
 * @FilePath: \netflix-clone\pages\api\auth\[...nextauth].ts
 * @Description:
 */
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prismadb from "../../../lib/prismadb";
export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "passord",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password required");
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("Email does not exist");
				}

				const isCorrectPassword = await compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isCorrectPassword) {
					throw new Error("Incorrect password");
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: "/auth",
	},
	debug: process.env.NODE_ENV === "development",
	adapter: PrismaAdapter(prismadb),
	session: { strategy: "jwt" },
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// import NextAuth from "next-auth/next";
// import Credentials from "next-auth/providers/credentials";
// import prismadb from "../../../lib/prismadb";
// import { compare } from "bcrypt";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// export default NextAuth({
// 	providers: [
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID || "",
// 			clientSecret: process.env.GITHUB_SECRET || "",
// 		}),
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_ID || "",
// 			clientSecret: process.env.GOOGLE_SECRET || "",
// 		}),
// 		Credentials({
// 			id: "credentials",
// 			name: "credentials",
// 			credentials: {
// 				email: {
// 					label: "Email",
// 					type: "text",
// 				},
// 				password: {
// 					label: "Password",
// 					type: "password",
// 				},
// 			},
// 			async authorize(credentials) {
// 				if (!credentials?.email || !credentials?.password) {
// 					throw new Error("Email and password required");
// 				}
// 				const user = await prismadb.user.findUnique({
// 					where: {
// 						email: credentials.email,
// 					},
// 				});

// 				if (!user || !user.hashedPassword) {
// 					throw new Error("Email does not exist");
// 				}
// 				const isCorrectPassword = await compare(
// 					credentials.password,
// 					user.hashedPassword
// 				);

// 				if (!isCorrectPassword) {
// 					throw new Error("Incorrect password");
// 				}
// 				return user;
// 			},
// 		}),
// 	],
// 	pages: {
// 		signIn: "/auth",
// 	},
// 	debug: process.env.NODE_ENV === "development",
// 	adapter: PrismaAdapter(prismadb),
// 	session: {
// 		strategy: "jwt",
// 	},
// 	jwt: {
// 		secret: process.env.NEXTAUTH_JWT_SECRET,
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// });
