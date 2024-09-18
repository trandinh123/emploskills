import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Project} from "../../api/projectManagement.type";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface DeleteProjectModalProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    projectToDelete: Project | null;
    onDeleteProject: () => void;
    isDeleting?: boolean;
}

export default function DeleteProjectModal({
    open,
    onOpenChange,
    projectToDelete,
    onDeleteProject,
    isDeleting
}: DeleteProjectModalProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project "{projectToDelete?.title}
                        " and remove all of its data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDeleteProject} disabled={isDeleting}>
                        <Loader2
                            className={cn("mr-2 h-4 w-4 animate-spin hidden", {
                                inline: isDeleting
                            })}
                        />
                        Delete Project
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
