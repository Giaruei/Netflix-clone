/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 15:02:53
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 15:48:40
 * @FilePath: \netflix-clone\pages\api\favorites.ts
 * @Description:
 */
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../lib/prismadb";
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
		const favoriteMovies = await prismadb.movie.findMany({
			where: {
				id: {
					in: currentUser?.favoriteIds,
				},
			},
		});
		return res.status(200).json(favoriteMovies);
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
