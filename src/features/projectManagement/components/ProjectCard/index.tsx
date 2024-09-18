import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Project, projectStatuses} from "../../api/projectManagement.type";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import OverflownText from "@/components/ui/overflownText";
import {PencilIcon, TrashIcon} from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClickTitle: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export default function ProjectCard({project, onClickTitle, onClickDelete, onClickEdit}: ProjectCardProps) {
    return (
        <Card key={project.id} className="overflow-hidden">
            <img src={project.pictureURL} alt={project.title} className="w-full h-48 object-cover" />
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <Button
                        variant="link"
                        className={cn("p-0 h-auto block max-w-[80%] font-semibold text-lg")}
                        onClick={onClickTitle}
                    >
                        <OverflownText>{project.title}</OverflownText>
                    </Button>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            project.status === projectStatuses.active
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-200 text-gray-800"
                        }`}
                    >
                        {project.status}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <OverflownText className="text-sm text-gray-600 text-ellipsis overflow-hidden block">
                    {project.description}
                </OverflownText>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" onClick={onClickEdit} data-testid={`edit-project-${project.id}`}>
                    <PencilIcon className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onClickDelete}
                    data-testid={`delete-project-${project.id}`}
                >
                    <TrashIcon className="h-4 w-4 mr-2" /> Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
