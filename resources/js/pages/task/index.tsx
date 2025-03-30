import { Checkbox } from "@/components/ui/checkbox";
import { BreadcrumbItem, Task } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function TaskIndex({ tasks, success }: { tasks: Task[], success: string }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
        return localStorage.getItem('taskViewMode') as 'grid' | 'list' || 'grid';
    });
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    
    const changeStatus = (id: number) => {
        router.put(`/dashboard/task/${id}`, {
            status: !tasks.find((task) => task.id === id)?.status,
        }, { preserveScroll: true });
    }

    const openDeleteDialog = (id: number) => {
        setTaskToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const deleteTask = () => {
        if (taskToDelete) {
            router.delete(`/dashboard/task/${taskToDelete}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Task deleted successfully');
                }
            });
            setIsDeleteDialogOpen(false);
            setTaskToDelete(null);
        }
    }

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const handleViewModeChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
        localStorage.setItem('taskViewMode', mode);
    };

    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Tasks',
            href: '/dashboard/task',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="space-y-6 container mx-auto mt-10 px-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tasks</h1>
                    <div className="flex gap-2">
                        <Button 
                            className="cursor-pointer"
                            variant={viewMode === 'grid' ? "default" : "outline"} 
                            size="icon"
                            onClick={() => handleViewModeChange('grid')}
                        >
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button 
                            className="cursor-pointer"
                            variant={viewMode === 'list' ? "default" : "outline"} 
                            size="icon"
                            onClick={() => handleViewModeChange('list')}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                    <Link href="/dashboard/task/create" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Create Task
                    </Link>
                </div>

                <div className="">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow flex flex-col justify-between">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground">#{task.id}</span>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <label htmlFor={`task-${task.id}`} className={`block cursor-pointer text-lg font-medium ${task.status ? "line-through text-muted-foreground" : ""}`}>
                                                        {task.title.length > 80 ? task.title.slice(0, 80) + '...' : task.title}
                                                    </label>
                                                </TooltipTrigger>
                                                {task.title.length > 80 && (
                                                    <TooltipContent>
                                                        {task.title}
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </div>
                                        <Checkbox 
                                            className="cursor-pointer"
                                            checked={task.status}
                                            onCheckedChange={() => changeStatus(task.id)}
                                            id={`task-${task.id}`}
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Link
                                            href={`/dashboard/task/${task.id}/edit`}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => openDeleteDialog(task.id)}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive text-destructive-foreground dark:hover:bg-destructive/85 h-9 px-3 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border bg-card">
                            <div className="flex items-center px-4 py-3 border-b font-medium">
                                <div className="w-16">ID</div>
                                <div className="flex-1">Title</div>
                                <div className="w-24 text-center">Status</div>
                                <div className="w-48 text-right">Actions</div>
                            </div>
                            {tasks.map((task) => (
                                <div key={task.id} className="flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-muted/50">
                                    <div className="w-16 text-sm text-muted-foreground">#{task.id}</div>
                                    <div className="flex-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <label htmlFor={`task-list-${task.id}`} className={`cursor-pointer ${task.status ? "line-through text-muted-foreground" : ""}`}>
                                                    {task.title.length > 80 ? task.title.slice(0, 80) + '...' : task.title}
                                                </label>
                                            </TooltipTrigger>
                                            {task.title.length > 80 && (
                                                <TooltipContent>
                                                    {task.title}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </div>
                                    <div className="w-24 text-center">
                                        <Checkbox 
                                            className="cursor-pointer"
                                            checked={task.status}
                                            onCheckedChange={() => changeStatus(task.id)}
                                            id={`task-list-${task.id}`}
                                        />
                                    </div>
                                    <div className="w-48 text-right space-x-2">
                                        <Link
                                            href={`/task/${task.id}/edit`}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => openDeleteDialog(task.id)}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive text-destructive-foreground dark:hover:bg-destructive/85 h-9 px-3 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the task.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer" onClick={deleteTask}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}