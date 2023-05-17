/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 10:51:20
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 10:53:49
 * @FilePath: \netflix-clone\hooks\useBillboard.ts
 * @Description:
 */

import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useBillboard = () => {
	const { data, error, isLoading } = useSWR("api/random", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return { data, error, isLoading };
};
export default useBillboard;
