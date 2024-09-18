import { projectStatuses } from './../../../features/projectManagement/api/projectManagement.type';
import { http, HttpResponse, PathParams } from 'msw';
import { projectManagementURI } from './../../../features/projectManagement/api/projectManagement.api';
import { Project } from '@/features/projectManagement/api/projectManagement.type';
import { DefaultBodyType, ResponseResolverInfo } from 'msw/lib/core/handlers/RequestHandler';
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';

export const sampleProjects: Project[] = [
    {
        id: 1,
        title: 'Project Alpha',
        description: 'This is the first project.',
        status: projectStatuses.active,
        pictureURL: 'https://picsum.photos/200/300',
    },
    {
        id: 2,
        title: 'Project Beta',
        description: 'This is the second project.',
        status: projectStatuses.completed,
        pictureURL: 'https://picsum.photos/200/300',
    },
    {
        id: 3,
        title: 'Project Gamma',
        description: 'This is the third project.',
        status: projectStatuses.active,
        pictureURL: 'https://picsum.photos/200/300',
    },
    {
        id: 4,
        title: 'Project Delta',
        description: 'This is the fourth project.',
        status: projectStatuses.completed,
        pictureURL: 'https://picsum.photos/200/300',
    },
];

export const sampleCreatedProjectResponse: Project = {
    id: 5,
    title: 'New Project',
    description: 'This is the new project.',
    status: projectStatuses.active,
    pictureURL: 'https://picsum.photos/200/300',
};

export const sampleEditedProjectResponse: Project = {
    id: 5,
    title: 'Edited Project',
    description: 'This is the edited project.',
    status: projectStatuses.completed,
    pictureURL: 'https://picsum.photos/200/300',
};

export type ResolverParams = ResponseResolverInfo<HttpRequestResolverExtras<PathParams>, DefaultBodyType>;

export const projectManagementHandlers = [
    http.get(projectManagementURI, () => {
        return HttpResponse.json(sampleProjects)
    }),
    http.post(projectManagementURI, async ({ request }: ResolverParams) => {
        const data = await request.json() as Omit<Project, 'id'>
        return HttpResponse.json({
            id: 100,
            ...data,
        })
    }),
    http.put(`${projectManagementURI}/:id`, async ({ request }: ResolverParams) => {
        const data = await request.json() as Omit<Project, 'id'>
        return HttpResponse.json({
            id: 101,
            ...data,
        })
    }),
    http.delete(`${projectManagementURI}/:id`, () => {
        return HttpResponse.json({})
    }),
]
