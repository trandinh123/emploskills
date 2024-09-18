import { api } from "@/lib/apiClient";
import { Project, projectStatuses } from "./projectManagement.type";
import { z } from "zod";

export const projectManagementURI = '/api/v1/project';
export const projectManagementKeys = {
    GET_PROJECTS: 'GET_PROJECTS',
    GET_PROJECT: 'GET_PROJECT',
}

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(projectStatuses),
    pictureURL: z.string().optional()
});

export type ProjectFormInputs = z.infer<typeof projectSchema>;

export const projectManagementApis = {
    getProjects: async () => {
        const response = await api.get<Project[]>(projectManagementURI);
        return response;
    },
    getProject: async ({ id }: { id: number }) => {
        const response = await api.get<Project>(`${projectManagementURI}/${id}`);
        return response;
    },
    createProject: async ({ data }: { data: ProjectFormInputs }) => {
        const response = await api.post(projectManagementURI, data);
        return response;
    },
    editProject: async ({ id, data }: {
        id: number;
        data: Partial<ProjectFormInputs>;
    }) => {
        const response = await api.put(`${projectManagementURI}/${id}`, { ...data, id });
        return response;
    },
    deleteProject: async ({ id }: { id: number }) => {
        const response = await api.delete(`${projectManagementURI}/${id}`);
        return response;
    }
}