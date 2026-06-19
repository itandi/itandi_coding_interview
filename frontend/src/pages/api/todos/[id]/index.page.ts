import type { NextApiRequest, NextApiResponse } from "next";
import type { UpdateTODO } from "../../../../types";
import { db } from "../../../../utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const todos = await db.get();
		const index = todos.findIndex(({ id }) => id === req.query.id);

		if (index === -1) {
			res.status(404).end();
		} else {
			res.status(200).json(todos[index]);
		}
	} else if (req.method === "PATCH") {
		const todos = await db.get();
		const index = todos.findIndex(({ id }) => id === req.query.id);

		if (index === -1) {
			res.status(404).end();
		} else {
			const { completed, content, title } = req.body as UpdateTODO;
			const todo = todos[index];

			const nextTodos = todos.with(index, {
				...todos[index],
				completed: completed ?? todo.completed,
				content: content ?? todo.content,
				title: title ?? todo.title,
				updatedAt: new Date().toISOString()
			});

			res.status(200).json(await db.save(nextTodos));
		}
	} else if (req.method === "DELETE") {
		const todos = await db.get();
		const index = todos.findIndex(({ id }) => id === req.query.id);

		if (index === -1) {
			res.status(404).end();
		} else {
			await db.save(todos.toSpliced(index, 1));

			res.status(204).end();
		}
	} else {
		res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
 		res.status(405).end();
	}
}
