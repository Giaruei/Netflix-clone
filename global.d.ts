/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-15 21:01:59
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-16 15:16:04
 * @FilePath: \netflix-clone\global.d.ts
 * @Description:
 */
import { PrismaClient } from "@prisma/client";

declare global {
	namespace globalThis {
		var prismadb: PrismaClient;
	}
}
