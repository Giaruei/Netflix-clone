/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-05-18 09:48:44
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-05-18 09:56:42
 * @FilePath: \netflix-clone\hooks\useInfoModal.ts
 * @Description:
 */
import { create } from "zustand";

export interface ModalStoreInterface {
	movieId?: string;
	isOpen: boolean;
	openModal: (movieId: string) => void;
	closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
	movieId: undefined,
	isOpen: false,
	openModal: (movieId: string) => set({ isOpen: true, movieId }),
	closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModal;
