/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 14:00:20
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 14:21:42
 * @FilePath: \netflix-clone\hooks\useMovieList.ts
 * @Description:
 */
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useMovieList = () => {
	const { data, error, isLoading } = useSWR("api/movies", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return { data, error, isLoading };
};

export default useMovieList;
