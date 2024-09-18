import ProjectFormModal, {ProjectFormProps} from "../ProjectFormModal";

type EditProjectModalProps = Omit<ProjectFormProps, "title" | "description" | "submitButtonLabel">;

export default function EditProjectModal(props: EditProjectModalProps) {
    return (
        <ProjectFormModal
            title="Update New Project"
            description="Make changes to your project here."
            submitButtonLabel="Update Project"
            {...props}
        />
    );
}
