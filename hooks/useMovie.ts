/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 22:43:38
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 22:45:08
 * @FilePath: \netflix-clone\hooks\useMovie.ts
 * @Description:
 */
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useMovie = (id?: string) => {
	const { data, error, isLoading } = useSWR(
		id ? `/api/movies/${id}` : null,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
	return { data, error, isLoading };
};
export default useMovie;
