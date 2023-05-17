/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-15 13:48:21
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 17:36:37
 * @FilePath: \netflix-clone\pages\index.tsx
 * @Description:
 */
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();

	return (
		<>
			<Navbar />
			<Billboard />
			<div className="pb-40">
				<MovieList title="Trending now" data={movies} />
				<MovieList title="My List" data={favorites} />
			</div>
		</>
	);
}
