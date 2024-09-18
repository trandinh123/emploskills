import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/reactQuery';
import { projectManagementApis } from './projectManagement.api';
import { getProjectsQueryOptions } from './useGetProjects';


type UseEditProjectOptions = MutationConfig<typeof projectManagementApis.editProject>;


export const useEditProject = (
    mutationConfig
        : UseEditProjectOptions = {}) => {
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
        mutationFn: projectManagementApis.editProject,
    });
};