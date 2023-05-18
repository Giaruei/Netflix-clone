/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 22:35:59
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 22:42:35
 * @FilePath: \netflix-clone\pages\api\movies\[movieId].ts
 * @Description:
 */
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}
	try {
		await serverAuth(req, res);
		const { movieId } = req.query;
		if (typeof movieId !== "string" || !movieId) {
			throw new Error("Invalid ID");
		}
		const movie = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			},
		});
		if (!movie) {
			throw new Error("Invalid ID");
		}
		return res.status(200).json(movie);
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
