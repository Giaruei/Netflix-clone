/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 20:11:27
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-16 20:13:43
 * @FilePath: \netflix-clone\hooks\useCurrentUser.ts
 * @Description:
 */
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useCurrentUser = () => {
	const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
	return { data, error, isLoading, mutate };
};

export default useCurrentUser;
