/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 20:03:41
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 10:47:11
 * @FilePath: \netflix-clone\pages\api\current.ts
 * @Description:
 */
import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}
	try {
		const { currentUser } = await serverAuth(req, res);
		return res.status(200).json(currentUser);
	} catch (error) {
		console.log(error);
		return res.status(405).end();
	}
}
