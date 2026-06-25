export type TODO = {
	completed: boolean;
	content: string;
	createdAt: string;
	id: string;
	title: string;
	updatedAt: string;
};

export type NewTODO = {
	content: string;
	title: string;
};

export type UpdateTODO = {
	completed?: boolean;
	content?: string;
	title?: string;
};
