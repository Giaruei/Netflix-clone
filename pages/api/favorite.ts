/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 14:48:35
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 22:22:47
 * @FilePath: \netflix-clone\pages\api\favorite.ts
 * @Description:
 */
import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "../../lib/prismadb";
import serverAuth from "../../lib/serverAuth";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method === "POST") {
			const { currentUser } = await serverAuth(req, res);
			const { movieId } = req.body;
			const existingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId,
				},
			});
			if (!existingMovie) {
				throw new Error("Invalid ID");
			}
			const user = await prismadb.user.update({
				where: {
					email: currentUser.email || "",
				},
				data: {
					favoriteIds: {
						push: movieId,
					},
				},
			});
			return res.status(200).json(user);
		}
		if (req.method === "DELETE") {
			const { currentUser } = await serverAuth(req, res);
			const { movieId } = req.query;
			const existingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId as string,
				},
			});
			if (!existingMovie) {
				throw new Error("Invalid ID");
			}
			const updatedFavoriteIds = without(
				currentUser.favoriteIds,
				movieId as string
			);
			const updatedUser = await prismadb.user.update({
				where: {
					email: currentUser.email || "",
				},
				data: {
					favoriteIds: updatedFavoriteIds,
				},
			});
			return res.status(200).json(updatedUser);
		}
		return res.status(405).end();
	} catch (error) {
		console.log(error);
		return res.status(400).end();
	}
}
