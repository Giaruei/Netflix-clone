/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-15 13:48:21
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-18 10:19:59
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
import InfoModal from "../components/InfoModal";
import useInfoModal from "../hooks/useInfoModal";

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
	const { isOpen, closeModal } = useInfoModal();
	return (
		<>
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navbar />
			<Billboard />
			<div className="pb-40">
				<MovieList title="Trending now" data={movies} />
				<MovieList title="My List" data={favorites} />
			</div>
		</>
	);
}
