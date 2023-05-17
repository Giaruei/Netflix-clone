/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 19:57:59
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 15:47:02
 * @FilePath: \netflix-clone\lib\serverAuth.ts
 * @Description:
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from "./prismadb";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerSession(req, res, authOptions);

	if (!session?.user?.email) {
		throw new Error("Not signed in");
	}

	const currentUser = await prismadb.user.findUnique({
		where: {
			email: session.user.email,
		},
	});

	if (!currentUser) {
		throw new Error("Not signed in");
	}

	return { currentUser };
};

export default serverAuth;
// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import prismadb from "./prismadb";

// const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
// 	const session = await getSession({ req });

// 	if (!session?.user?.email) {
// 		throw new Error("Not signed in");
// 	}

// 	const currentUser = await prismadb.user.findUnique({
// 		where: {
// 			email: session.user.email,
// 		},
// 	});

// 	if (!currentUser) {
// 		throw new Error("Not signed in");
// 	}

// 	return { currentUser };
// };

// export default serverAuth;
