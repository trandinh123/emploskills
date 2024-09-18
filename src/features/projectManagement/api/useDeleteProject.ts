import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/reactQuery';
import { projectManagementApis } from './projectManagement.api';
import { getProjectsQueryOptions } from './useGetProjects';


type UseDeleteProjectOptions = MutationConfig<typeof projectManagementApis.deleteProject>;


export const useDeleteProject = (
    mutationConfig
        : UseDeleteProjectOptions = {}) => {
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
        mutationFn: projectManagementApis.deleteProject,
    });
};