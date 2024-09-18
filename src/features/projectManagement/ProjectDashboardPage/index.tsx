import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {cn} from "@/lib/utils";
import {AxiosResponse} from "axios";
import {PlusIcon} from "lucide-react";
import {useState} from "react";
import {ProjectFormInputs} from "../api/projectManagement.api";
import {Project} from "../api/projectManagement.type";
import {useCreateProject} from "../api/useCreateProject";
import {useDeleteProject} from "../api/useDeleteProject";
import {useEditProject} from "../api/useEditProject";
import {useGetProjects} from "../api/useGetProjects";
import CreateProjectModal from "../components/CreateProjectModal";
import DeleteProjectModal from "../components/DeleteProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import ProjectCard from "../components/ProjectCard";

export default function ProjectDashboard() {
    const [isOpenCreateProjectModal, setIsOpenCreateProjectModal] = useState(false);
    const [isOpenEditProjectModal, setIsOpenEditProjectModal] = useState(false);
    const [isOpenDeleteProjectModal, setIsOpenDeleteProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const {toast} = useToast();
    const {data: projects} = useGetProjects();

    const {mutate: createProject, isPending: isCreating} = useCreateProject({
        onSuccess: (data: AxiosResponse<Project>) => {
            setIsOpenCreateProjectModal(false);
            toast({
                title: "Project created successfully",
                description: `The project "${data.data.title}" has been successfully created.`
            });
        }
    });
    const {mutate: editProject, isPending: isEditing} = useEditProject({
        onSuccess: (_, variables: {data: Partial<ProjectFormInputs>}) => {
            setIsOpenEditProjectModal(false);
            toast({
                title: "Project updated successfully",
                description: `The project "${variables?.data.title}" has been successfully updated.`
            });
        }
    });
    const {mutate: deleteProject, isPending: isDeleting} = useDeleteProject({
        onSuccess: (data: AxiosResponse<Project>) => {
            setIsOpenDeleteProjectModal(false);
            toast({
                title: "Project deleted successfully",
                description: `The project "${data.data.title}" has been successfully deleted.`
            });
        }
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Project Dashboard</h1>
                <div className="mb-6 flex justify-between items-center">
                    <Button onClick={() => setIsOpenCreateProjectModal(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" /> New Project
                    </Button>
                    <div
                        className={cn({
                            hidden: !projects?.length
                        })}
                    >
                        Showing 1 to {projects?.length} projects
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClickTitle={() => {
                                setSelectedProject(project);
                                setIsOpenEditProjectModal(true);
                            }}
                            onClickEdit={() => {
                                setSelectedProject(project);
                                setIsOpenEditProjectModal(true);
                            }}
                            onClickDelete={() => {
                                setSelectedProject(project);
                                setIsOpenDeleteProjectModal(true);
                            }}
                        />
                    ))}
                </div>
                {isOpenCreateProjectModal && (
                    <CreateProjectModal
                        open={isOpenCreateProjectModal}
                        onOpenChange={setIsOpenCreateProjectModal}
                        onSubmit={(data) => {
                            createProject({data});
                        }}
                        submitting={isCreating}
                    />
                )}
                {isOpenEditProjectModal && (
                    <EditProjectModal
                        open={isOpenEditProjectModal}
                        onOpenChange={setIsOpenEditProjectModal}
                        onSubmit={(data) => {
                            editProject({id: selectedProject!.id, data});
                        }}
                        submitting={isEditing}
                        defaultValues={selectedProject!}
                    />
                )}
                {isOpenDeleteProjectModal && (
                    <DeleteProjectModal
                        open={isOpenDeleteProjectModal}
                        onOpenChange={setIsOpenDeleteProjectModal}
                        onDeleteProject={() => {
                            deleteProject({id: selectedProject!.id});
                        }}
                        projectToDelete={selectedProject}
                        isDeleting={isDeleting}
                    />
                )}
            </div>
        </div>
    );
}
