/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 15:59:49
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 10:43:52
 * @FilePath: \netflix-clone\pages\api\register.ts
 * @Description:
 */
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).end();
	}
	try {
		const { email, name, password } = req.body;
		const existingUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return res.status(422).json({ error: "Email taken" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: "",
				emailVerified: new Date(),
			},
		});

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
