import {Button} from "@/components/ui/button";
import ControlledInput from "@/components/ui/controlledForm/controlledInput";
import ControlledSelect from "@/components/ui/controlledForm/controlledSelect";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Form, FormControl} from "@/components/ui/form";
import {SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {ProjectFormInputs, projectSchema} from "../../api/projectManagement.api";
import {projectStatuses} from "../../api/projectManagement.type";

export interface ProjectFormProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
    title: React.ReactNode;
    description: React.ReactNode;
    onSubmit: (data: ProjectFormInputs) => void;
    defaultValues?: ProjectFormInputs;
    submitButtonLabel: string;
    submitting?: boolean;
}

export default function ProjectFormModal({
    open,
    onOpenChange,
    title,
    description,
    defaultValues = {
        title: "",
        description: "",
        status: projectStatuses.active,
        pictureURL: "https://picsum.photos/200/300"
    },
    submitButtonLabel,
    onSubmit,
    submitting
}: ProjectFormProps) {
    const methods = useForm<ProjectFormInputs>({
        resolver: zodResolver(projectSchema),
        values: defaultValues
    });
    const {handleSubmit} = methods;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Form {...methods}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(onSubmit)();
                        }}
                    >
                        <div className="grid gap-3 py-4">
                            <ControlledInput name="title" label="Title" className="w-full" />
                            <ControlledInput name="description" label="Description" className="w-full" />
                            <ControlledSelect name="status" label="Status">
                                <FormControl>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue
                                            data-testid="status-select-trigger"
                                            defaultValue={projectStatuses.active}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={projectStatuses.active}>
                                            <span data-testid={`status-option-${projectStatuses.active}`}>Active</span>
                                        </SelectItem>
                                        <SelectItem value={projectStatuses.completed}>
                                            <span data-testid={`status-option-${projectStatuses.completed}`}>
                                                Completed
                                            </span>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </ControlledSelect>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={submitting}>
                                <Loader2
                                    className={cn("mr-2 h-4 w-4 animate-spin hidden", {
                                        inline: submitting
                                    })}
                                />
                                {submitButtonLabel}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
