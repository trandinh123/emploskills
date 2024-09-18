export const projectStatuses = {
    active: 'Active',
    completed: 'Completed',
} as const;

export type ProjectStatuses = typeof projectStatuses[keyof typeof projectStatuses];

export interface Project {
    id: number,
    title: string,
    description: string,
    status: ProjectStatuses,
    pictureURL: string,
}
