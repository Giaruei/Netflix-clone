/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 15:07:01
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 15:07:01
 * @FilePath: \netflix-clone\hooks\useFavorites.ts
 * @Description:
 */
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useFavorites = () => {
	const { data, error, isLoading, mutate } = useSWR("api/favorites", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return { data, error, isLoading, mutate };
};
export default useFavorites;
