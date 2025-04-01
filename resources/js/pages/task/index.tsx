import { BreadcrumbItem, Task, Board } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import { List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { 
    TaskCard, 
    TaskRow, 
    DeleteConfirmationDialog 
} from "@/components/task/task-components";

// View Mode Toggle Component
interface ViewModeToggleProps {
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
}

const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => (
    <div className="flex gap-2">
        <Button 
            className="cursor-pointer"
            variant={viewMode === 'grid' ? "default" : "outline"} 
            size="icon"
            onClick={() => onViewModeChange('grid')}
        >
            <Grid className="h-4 w-4" />
        </Button>
        <Button 
            className="cursor-pointer"
            variant={viewMode === 'list' ? "default" : "outline"} 
            size="icon"
            onClick={() => onViewModeChange('list')}
        >
            <List className="h-4 w-4" />
        </Button>
    </div>
);

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
                    <ViewModeToggle 
                        viewMode={viewMode} 
                        onViewModeChange={handleViewModeChange} 
                    />
                    <Link href={route('board.task.create', { board })} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Create Task
                    </Link>
                </div>
                <div className="">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map((task) => (
                                <TaskCard 
                                    key={task.id}
                                    task={task}
                                    onStatusChange={changeStatus}
                                    onDelete={openDeleteDialog}
                                />
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
                                <TaskRow 
                                    key={task.id}
                                    task={task}
                                    onStatusChange={changeStatus}
                                    onDelete={openDeleteDialog}
                                />
                            ))}
                        </div>
                    )}
                </div>
                
                <DeleteConfirmationDialog 
                    isOpen={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                    onDelete={deleteTask}
                />
            </div>
        </AppLayout>
    );
}