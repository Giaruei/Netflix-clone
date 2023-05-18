/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-16 21:41:52
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-18 10:38:26
 * @FilePath: \netflix-clone\components\AccountMenu.tsx
 * @Description:
 */
import { signOut } from "next-auth/react";
import React from "react";
import useCurrentUser from "../hooks/useCurrentUser";

interface AccountMenuProps {
	visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
	const { data } = useCurrentUser();
	if (!visible) {
		return null;
	}

	return (
		<div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
			<div className="flex flex-col gap-3">
				<div className="px-3 group/item flex flex-row gap-3 items-center w-full">
					<img
						className="w-8 rounded-md"
						src="/images/default-slate.png"
						alt=""
					/>
					<p className="text-white text-sm group-hover/item:underline">
						{data?.name}
					</p>
				</div>
			</div>
			<hr className="bg-gray-600 border-0 h-px my-4" />
			<div
				onClick={() => {
					signOut();
				}}
				className="px-3 text-center text-white text-sm hover:underline"
			>
				Sign out of Netflix
			</div>
		</div>
	);
};

export default AccountMenu;
