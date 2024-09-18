import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/reactQuery';

import { projectManagementApis, projectSchema } from './projectManagement.api';
import { getProjectsQueryOptions } from './useGetProjects';


export type CreateProjectInput = z.infer<typeof projectSchema>;
type UseCreateProjectOptions = MutationConfig<typeof projectManagementApis.createProject>;


export const useCreateProject = (
    mutationConfig
        : UseCreateProjectOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getProjectsQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: projectManagementApis.createProject,
    });
};