import ProjectFormModal, {ProjectFormProps} from "../ProjectFormModal";

type CreateProjectModalProps = Omit<ProjectFormProps, "title" | "description" | "submitButtonLabel">;

export default function CreateProjectModal(props: CreateProjectModalProps) {
    return (
        <ProjectFormModal
            title="Create New Project"
            description="Add the details of your new project here."
            submitButtonLabel="Create Project"
            {...props}
        />
    );
}
