import {sampleProjects} from "@/__tests__/mocks/handlers/projectManagement.handler";
import {renderComponent} from "@/__tests__/testUtils";
import {ProjectFormInputs} from "@/features/projectManagement/api/projectManagement.api";
import {projectStatuses} from "@/features/projectManagement/api/projectManagement.type";
import ProjectDashboard from "@/features/projectManagement/ProjectDashboardPage";
import {screen, waitFor} from "@testing-library/dom";
import {userEvent} from "@testing-library/user-event";
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";

describe("ProjectDashboardPage", () => {
    beforeEach(() => {
        vi.useFakeTimers({
            shouldAdvanceTime: true
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const user = userEvent.setup();

    const expectProjectCard = (title: string, description: string, status: string) => {
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByText(status)).toBeInTheDocument();
    };

    const handleProjectForm = async ({title, description}: ProjectFormInputs) => {
        const titleInput = screen.getByRole("textbox", {
            name: /title/i
        });
        const descriptionInput = screen.getByRole("textbox", {
            name: /description/i
        });
        await user.clear(titleInput);
        await user.clear(descriptionInput);

        await user.type(titleInput, title);
        if (description) {
            await user.type(descriptionInput, description);
        }
    };

    it("should render project list correctly", async () => {
        renderComponent(<ProjectDashboard />);
        sampleProjects.forEach(async (project) => {
            await waitFor(() => expectProjectCard(project.title, project.description, project.status));
        });
    });

    it("should show toast when create project success", async () => {
        const newProject = {
            title: "New Project",
            description: "This is the new project.",
            status: projectStatuses.active
        };
        renderComponent(<ProjectDashboard />);
        const createButton = screen.getByRole("button", {
            name: /new project/i
        });
        await user.click(createButton);
        await vi.advanceTimersByTimeAsync(3000);
        await handleProjectForm(newProject);
        const submitButton = screen.getByText("Create Project");
        await user.click(submitButton);
        await waitFor(() => expect(screen.getByText("Project created successfully")).toBeVisible());
    });

    it("should show toast when edit project success", async () => {
        const editedProject = {
            title: "Edited Project",
            description: "This is the edited project.",
            status: projectStatuses.completed
        };
        renderComponent(<ProjectDashboard />);
        await vi.advanceTimersByTimeAsync(5000);
        const editButton = screen.getByTestId(`edit-project-${sampleProjects[0].id}`);
        await user.click(editButton);
        await handleProjectForm(editedProject);
        const submitButton = screen.getByText("Update Project");
        await user.click(submitButton);

        await waitFor(() => expect(screen.getByText("Project updated successfully")).toBeVisible());
    });

    it("should show toast when delete project success", async () => {
        renderComponent(<ProjectDashboard />);
        await vi.advanceTimersByTimeAsync(5000);
        const deleteButton = screen.getByTestId(`delete-project-${sampleProjects[0].id}`);
        await user.click(deleteButton);
        const confirmButton = screen.getByText("Delete Project");
        await user.click(confirmButton);
        await waitFor(() => expect(screen.getByText("Project deleted successfully")).toBeVisible());
    });
});
