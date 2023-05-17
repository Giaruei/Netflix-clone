/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 20:08:57
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-16 20:10:07
 * @FilePath: \netflix-clone\lib\fetcher.ts
 * @Description: 
 */

import axios from "axios";

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export default fetcher