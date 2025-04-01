import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ChevronDown, Minus, ChevronUp, ChevronsDown, ChevronsUp } from "lucide-react";
import { Link } from "@inertiajs/react";
import { TaskStatus, TaskPriority } from "@/enums";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Task Status Dropdown Component
interface TaskStatusDropdownProps {
    taskId: number;
    status: number;
    onStatusChange: (id: number, status: number) => void;
}

export const TaskStatusDropdown = ({ taskId, status, onStatusChange }: TaskStatusDropdownProps) => {
    const getStatusStyles = (status: number) => {
        switch(status) {
            case TaskStatus.TODO: return "bg-slate-900 text-slate-300";
            case TaskStatus.IN_PROGRESS: return "bg-blue-900 text-blue-300";
            case TaskStatus.TESTING: return "bg-purple-900 text-purple-300";
            case TaskStatus.DONE: return "bg-green-900 text-green-300";
            case TaskStatus.BACKLOG: return "bg-gray-900 text-gray-300";
            case TaskStatus.BLOCKED: return "bg-red-900 text-red-300";
            case TaskStatus.READY_FOR_DEPLOYMENT: return "bg-yellow-900 text-yellow-300";
            case TaskStatus.REJECTED: return "bg-pink-900 text-pink-300";
            default: return "";
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-8 text-xs ${getStatusStyles(status)}`}
                >
                    {TaskStatus[status].replace(/_/g, ' ').toLowerCase()}
                    <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(TaskStatus)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => (
                        <DropdownMenuItem 
                            key={value} 
                            onClick={() => onStatusChange(taskId, Number(value))}
                            className={`${status === Number(value) ? "bg-muted" : ""}`}
                        >
                            {key.replace(/_/g, ' ').toLowerCase()}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// Task Priority Badge Component
interface TaskPriorityBadgeProps {
    priority: number;
}

export const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => {
    const getPriorityIcon = (priority: number) => {
        switch(priority) {
            case TaskPriority.HIGHEST: return <ChevronsUp className="h-4 w-4 text-red-500" />;
            case TaskPriority.HIGH: return <ChevronUp className="h-4 w-4 text-red-500" />;
            case TaskPriority.MEDIUM: return <Minus className="h-4 w-4 text-yellow-500" />;
            case TaskPriority.LOW: return <ChevronDown className="h-4 w-4 text-blue-500" />;
            case TaskPriority.LOWEST: return <ChevronsDown className="h-4 w-4 text-blue-500" />;
            default: return null;
        }
    };

    return (
        <div className="border rounded p-1 inline-flex items-center px-2.5 py-1.5 gap-1 text-sm text-foreground">
            {getPriorityIcon(priority)}
            {TaskPriority[priority].replace(/_/g, ' ').toLowerCase()}
        </div>
    );
};

// Task Actions Component
interface TaskActionsProps {
    task: Task;
    onDelete: (id: number) => void;
}

export const TaskActions = ({ task, onDelete }: TaskActionsProps) => (
    <div className="flex gap-2">
        <Link
            href={route('task.edit', { task })}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
            Edit
        </Link>
        <button
            onClick={() => onDelete(task.id)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive text-destructive-foreground dark:hover:bg-destructive/85 h-9 px-3 cursor-pointer"
        >
            Delete
        </button>
    </div>
);

// Grid View Task Card Component
interface TaskCardProps {
    task: Task;
    onStatusChange: (id: number, status: number) => void;
    onDelete: (id: number) => void;
}

export const TaskCard = ({ task, onStatusChange, onDelete }: TaskCardProps) => (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow flex flex-col justify-between">
        <div className="flex flex-col items-start justify-between mb-4">
            <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">#{task.id}</span>
                <TaskStatusDropdown 
                    taskId={task.id} 
                    status={task.status} 
                    onStatusChange={onStatusChange} 
                />
            </div>
            <span className="text-lg font-medium">
                {task.title}
            </span>
        </div>
        <div className="flex justify-between w-full">
            <TaskPriorityBadge priority={task.priority} />
            <TaskActions task={task} onDelete={onDelete} />
        </div>
    </div>
);

// List View Task Row Component
interface TaskRowProps {
    task: Task;
    onStatusChange: (id: number, status: number) => void;
    onDelete: (id: number) => void;
}

export const TaskRow = ({ task, onStatusChange, onDelete }: TaskRowProps) => (
    <div className="flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-muted/50">
        <div className="w-16 text-sm text-muted-foreground">#{task.id}</div>
        <div className="flex-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{task.title}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{task.title}</p>
                </TooltipContent>
            </Tooltip>
        </div>
        <div className="w-24 text-center">
            <TaskPriorityBadge priority={task.priority} />
        </div>
        <div className="w-48 text-center">
            <TaskStatusDropdown 
                taskId={task.id} 
                status={task.status} 
                onStatusChange={onStatusChange} 
            />
        </div>
        <div className="w-48 text-right">
            <TaskActions task={task} onDelete={onDelete} />
        </div>
    </div>
);

// Delete Confirmation Dialog
interface DeleteDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onDelete: () => void;
}

export const DeleteConfirmationDialog = ({ isOpen, onOpenChange, onDelete }: DeleteDialogProps) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the task.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer" onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
); 