import fs from "node:fs/promises";
import libpath from "node:path";
import type { TODO } from "../types";

const createDB = () => {
	const todosJsonPath = libpath.join(process.cwd(), "todos.json");

	const save = async (todos: TODO[]) => {
		await fs.writeFile(todosJsonPath, JSON.stringify(todos));

		return todos;
	};

	const get = async () => {
		const raw = await fs.readFile(todosJsonPath, { encoding: "utf-8" });

		return JSON.parse(raw) as TODO[];
	};

	return { get, save };
};

export const db = createDB();
