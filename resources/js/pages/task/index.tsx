import { BreadcrumbItem, Task, Board } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { List, Grid, ChevronDown, Minus, ChevronUp, ChevronsDown, ChevronsUp, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TaskStatus, TaskPriority } from "@/enums"; 

export default function Index({ tasks, success, board }: { tasks: Task[], success: string, board: Board }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
        return localStorage.getItem('taskViewMode') as 'grid' | 'list' || 'grid';
    });
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    
    const changeStatus = (id: number, status: number) => {
        router.put(route('task.update', { task: id }), {
            status: status,
        }, { preserveScroll: true });
    }

    const openDeleteDialog = (id: number) => {
        setTaskToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const deleteTask = () => {
        if (taskToDelete) {
            router.delete(route('task.destroy', { task: taskToDelete }), {
                preserveScroll: true,
            });
            setIsDeleteDialogOpen(false);
            setTaskToDelete(null);
        }
    }

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        return router.on('success', (event) => {
          toast.success(event.detail.page.props.success as string);
        })
      }, [])

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
            title: 'Boards',
            href: route('user.board.index', { user: board.user_id }),
        },
        {
            title: board.name,
            href: route('board.show', { board }),
        },
        {
            title: 'Tasks',
            href: route('board.task.index', { board }),
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
                    <Link href={route('board.task.create', { board })} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Create Task
                    </Link>
                </div>
                <div className="">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow flex flex-col justify-between">
                                    <div className="flex flex-col items-start justify-between mb-4">
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-sm text-muted-foreground">#{task.id}</span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className={`h-8 text-xs ${
                                                        task.status === TaskStatus.TODO ? "bg-slate-900 text-slate-300" :
                                                        task.status === TaskStatus.IN_PROGRESS ? "bg-blue-900 text-blue-300" :
                                                        task.status === TaskStatus.TESTING ? "bg-purple-900 text-purple-300" :
                                                        task.status === TaskStatus.DONE ? "bg-green-900 text-green-300" :
                                                        task.status === TaskStatus.BACKLOG ? "bg-gray-900 text-gray-300" :
                                                        task.status === TaskStatus.BLOCKED ? "bg-red-900 text-red-300" :
                                                        task.status === TaskStatus.READY_FOR_DEPLOYMENT ? "bg-yellow-900 text-yellow-300" :
                                                        task.status === TaskStatus.REJECTED ? "bg-pink-900 text-pink-300" :
                                                        ""
                                                    }`}
                                                >
                                                    {TaskStatus[task.status].replace(/_/g, ' ').toLowerCase()}
                                                    <ChevronDown className="ml-1 h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {Object.entries(TaskStatus)
                                                    .filter(([key]) => isNaN(Number(key)))
                                                    .map(([key, value]) => (
                                                        <DropdownMenuItem 
                                                            key={value} 
                                                            onClick={() => changeStatus(task.id, Number(value))}
                                                            className={`${
                                                                task.status === Number(value) ? "bg-muted" : ""
                                                            }`}
                                                        >
                                                            {key.replace(/_/g, ' ').toLowerCase()}
                                                        </DropdownMenuItem>
                                                    ))
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        </div>
                                            <span className={`text-lg font-medium`}>
                                                {task.title}
                                            </span>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <div className="border rounded p-1 inline-flex items-center px-2.5 py-1.5 gap-1 text-sm text-foreground">
                                                {task.priority === TaskPriority.HIGHEST && <ChevronsUp className="h-4 w-4 text-red-500" />}
                                                {task.priority === TaskPriority.HIGH && <ChevronUp className="h-4 w-4 text-red-500" />}
                                                {task.priority === TaskPriority.MEDIUM && <Minus className="h-4 w-4 text-yellow-500" />}
                                                {task.priority === TaskPriority.LOW && <ChevronDown className="h-4 w-4 text-blue-500" />}
                                                {task.priority === TaskPriority.LOWEST && <ChevronsDown className="h-4 w-4 text-blue-500" />}
                                                {TaskPriority[task.priority].replace(/_/g, ' ').toLowerCase()}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('task.edit', { task })}
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
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border bg-card">
                            <div className="flex items-center px-4 py-3 border-b font-medium">
                                <div className="w-16">ID</div>
                                <div className="flex-1">Title</div>
                                <div className="w-24 text-center">Priority</div>
                                <div className="w-48 text-center">Status</div>
                                <div className="w-48 text-right">Actions</div>
                            </div>
                            {tasks.map((task) => (
                                <div key={task.id} className="flex items-center px-4 py-3 border-b last:border-b-0 hover:bg-muted/50">
                                    <div className="w-16 text-sm text-muted-foreground">#{task.id}</div>
                                    <div className="flex-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span>
                                                    {task.title}
                                                </span>
                                            </TooltipTrigger>
                                            {task.title.length > 80 && (
                                                <TooltipContent>
                                                    {task.title}
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </div>
                                    <div className="w-24 text-center">
                                        <div className="w-24 border rounded p-1 inline-flex items-center justify-center px-2.5 py-1.5 gap-1 text-sm text-foreground">
                                            {task.priority === TaskPriority.HIGHEST && <ChevronsUp className="h-4 w-4 text-red-500" />}
                                            {task.priority === TaskPriority.HIGH && <ChevronUp className="h-4 w-4 text-red-500" />}
                                            {task.priority === TaskPriority.MEDIUM && <Minus className="h-4 w-4 text-yellow-500" />}
                                            {task.priority === TaskPriority.LOW && <ChevronDown className="h-4 w-4 text-blue-500" />}
                                            {task.priority === TaskPriority.LOWEST && <ChevronsDown className="h-4 w-4 text-blue-500" />}
                                            {TaskPriority[task.priority].replace(/_/g, ' ').toLowerCase()}
                                        </div> 
                                    </div>
                                    <div className="w-48 px-3 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className={`h-8 w-44 flex items-center justify-between text-xs ${
                                                        task.status === TaskStatus.TODO ? "bg-slate-900 text-slate-300" :
                                                        task.status === TaskStatus.IN_PROGRESS ? "bg-blue-900 text-blue-300" :
                                                        task.status === TaskStatus.TESTING ? "bg-purple-900 text-purple-300" :
                                                        task.status === TaskStatus.DONE ? "bg-green-900 text-green-300" :
                                                        task.status === TaskStatus.BACKLOG ? "bg-gray-900 text-gray-300" :
                                                        task.status === TaskStatus.BLOCKED ? "bg-red-900 text-red-300" :
                                                        task.status === TaskStatus.READY_FOR_DEPLOYMENT ? "bg-yellow-900 text-yellow-300" :
                                                        task.status === TaskStatus.REJECTED ? "bg-pink-900 text-pink-300" :
                                                        ""
                                                    }`}
                                                >
                                                    {TaskStatus[task.status].replace(/_/g, ' ').toLowerCase()}
                                                    <ChevronDown className="ml-1 h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {Object.entries(TaskStatus)
                                                    .filter(([key]) => isNaN(Number(key)))
                                                    .map(([key, value]) => (
                                                        <DropdownMenuItem 
                                                            key={value} 
                                                            onClick={() => changeStatus(task.id, Number(value))}
                                                            className={`w-44 ${
                                                                task.status === value ? "bg-muted" : ""
                                                            }`}
                                                        >
                                                            {key.replace(/_/g, ' ').toLowerCase()}
                                                        </DropdownMenuItem>
                                                    ))
                                                }
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="w-48 text-right space-x-2">
                                        <Link
                                            href={route('task.edit', { task })}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => openDeleteDialog(task.id)}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive text-destructive-foreground dark:hover:bg-destructive/85 h-9 px-3 cursor-pointer"
                                        >
                                            <Trash className="h-4 w-4" />
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