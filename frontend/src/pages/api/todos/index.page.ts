import crypto from "node:crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NewTODO, TODO } from "../../../types";
import { db } from "../../../utils";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TODO[]>
) {
	if (req.method === "GET") {
		res.status(200).json(await db.get());
	} else if (req.method === "POST") {
		const { content, title } = req.body as NewTODO;
		const nextTodos = (await db.get()).concat({
			completed: false,
			content,
			createdAt: new Date().toISOString(),
			id: crypto.randomUUID(),
			title,
			updatedAt: new Date().toISOString()
		});

		res.status(201).json(await db.save(nextTodos));
	} else {
		res.setHeader("Allow", ["GET", "POST"]);
 		res.status(405).end();
	}
}
