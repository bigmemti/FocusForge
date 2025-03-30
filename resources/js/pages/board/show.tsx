import { Board, BreadcrumbItem, Task } from "@/types";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Pencil } from "lucide-react";

export default function Show({ board, tasks }: { board: Board, tasks: Task[] }) {

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
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Board" />
            <div className="container mx-auto p-4 mt-10">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{board.name}</h1>
                        <div className="flex space-x-2">
                            <Link
                                href={route('board.edit', { board })}
                                className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                                aria-label="Edit Board"
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Tasks</h2>
                            <Link 
                                href={route('board.task.index', { board })} 
                                className="px-2.5 py-0.5 bg-muted rounded-md text-sm font-medium hover:bg-muted/80"
                            >
                                {tasks.length} tasks +
                            </Link>
                        </div>
                        
                        <div className="rounded-lg border bg-card">
                            <div className="hidden lg:flex items-center px-4 py-3 border-b font-medium">
                                <div className="w-16">ID</div>
                                <div className="flex-1">Title</div>
                                <div className="w-24 text-right">Status</div>
                            </div>
                            
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <div key={task.id} className="flex flex-col lg:flex-row items-center px-4 py-3 border-b last:border-b-0 lg:hover:bg-muted/50">
                                        <div className="hidden lg:block lg:w-16 text-sm text-muted-foreground">#{task.id}</div>
                                        <div className="flex-1 text-center lg:text-left mb-3 lg:mb-0">
                                            <div className="block lg:hidden mb-2">
                                                <span className="text-sm text-muted-foreground">ID: {task.id}</span>
                                            </div>
                                            <div className={`font-medium ${task.status ? 'line-through text-muted-foreground' : ''}`}>
                                                {task.title}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-24 flex justify-center lg:justify-end">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                task.status 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                            }`}>
                                                {task.status ? 'Completed' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-muted-foreground">
                                    No tasks available for this board yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}