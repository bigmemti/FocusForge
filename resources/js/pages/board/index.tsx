import { Board, BreadcrumbItem, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { toast } from "sonner"
import { useEffect, useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
export default function Index({ boards, success, user }: { boards: Board[], success: string, user: User }) {
    
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [boardToDelete, setBoardToDelete] = useState<number | null>(null);

    const openDeleteDialog = (id: number) => {
        setBoardToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const deleteTask = () => {
        if (boardToDelete) {
            router.delete(`/dashboard/board/${boardToDelete}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Board deleted successfully');
                }
            });
            setIsDeleteDialogOpen(false);
            setBoardToDelete(null);
        }
    }

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Boards',
            href: route('user.board.index', { user }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Boards" />
            <div className="space-y-6 container mx-auto mt-10 px-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Boards</h1>
                    <div className="flex gap-2">
                    </div>
                    <Link href={route('user.board.create', { user })} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Create Board
                    </Link>
                </div>

                <div className="">
                        <div className="rounded-lg border bg-card">
                            <div className="hidden lg:flex items-center px-4 py-3 border-b font-medium">
                                <div className="w-16">ID</div>
                                <div className="flex-1">Title</div>
                                <div className="w-48 text-right">Actions</div>
                            </div>
                            {boards.map((board) => (
                                <div key={board.id} className="flex flex-col lg:flex-row items-center px-4 py-3 border-b last:border-b-0 lg:hover:bg-muted/50">
                                    <div className="hidden lg:block lg:w-16 text-sm text-muted-foreground">#{board.id}</div>
                                    <div className="hidden lg:block lg:w-full text-sm text-muted-foreground">{board.name}</div>
                                    <div className="flex-1 text-center lg:text-left mb-3 lg:mb-0">
                                        <div className="block lg:hidden mb-2">
                                            <span className="text-sm text-muted-foreground">ID: {board.id}</span>
                                        </div>
                                        <div className="inline-block me-3 lg:hidden mb-2">
                                            <span className="text-sm text-muted-foreground">Name: {board.name}</span>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-48 flex justify-center lg:justify-end space-x-2">
                                        <Link
                                            href={route('board.show', { board })}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={route('board.edit', { board })}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => openDeleteDialog(board.id)}
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-none dark:bg-destructive text-destructive-foreground dark:hover:bg-destructive/85 h-9 px-3 cursor-pointer"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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