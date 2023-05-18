/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 14:03:28
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 20:43:15
 * @FilePath: \netflix-clone\components\MovieList.tsx
 * @Description:
 */
import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { MovieInterFace } from "../types";

interface MovieListProps {
	// data: Record<string, any>[];
	data: MovieInterFace[];
	title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
	if (isEmpty(data)) {
		return null;
	}

	return (
		<div className="px-4 md:px-12 mt-4 space-y-8">
			<div>
				<p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
					{title}
				</p>
				<div className="grid grid-cols-4 gap-2">
					{data.map((movie) => (
						<MovieCard key={movie.id} data={movie} />
					))}
				</div>
			</div>
		</div>
	);
};

export default MovieList;
