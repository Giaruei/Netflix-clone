/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-17 15:09:24
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-17 22:22:11
 * @FilePath: \netflix-clone\components\FavoriteButton.tsx
 * @Description:
 */
import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "../hooks/useCurrentUser";
import useFavorites from "../hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
	movieId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
	const { mutate: mutateFavorites } = useFavorites();

	const { data: currentUser, mutate } = useCurrentUser();

	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(movieId);
	}, [currentUser, movieId]);

	const toggleFavorites = useCallback(async () => {
		let response;
		if (isFavorite) {
			response = await axios.delete("/api/favorite", {
				params: { movieId },
			});
		} else {
			response = await axios.post("/api/favorite", { movieId });
		}

		const updatedFavoriteIds = response?.data?.favoriteIds;

		mutate({
			...currentUser,
			favoriteIds: updatedFavoriteIds,
		});
		mutateFavorites();
	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

	const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

	return (
		<div
			onClick={toggleFavorites}
			className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
		>
			<Icon
				className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6"
				size={25}
			/>
		</div>
	);
};

export default FavoriteButton;
