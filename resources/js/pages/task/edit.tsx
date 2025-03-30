import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Task } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ task }: { task: Task }) {
    const { put, data, setData, errors, processing } = useForm({
        title: task.title,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(`/dashboard/task/${task.id}`);
    }
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Tasks',
            href: '/dashboard/task',
        },
        {
            title: 'Edit Task',
            href: `/dashboard/task/${task.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4 mt-10">
                <Head title="Edit Task" />
                <div className="flex flex-col gap-4 max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold">Edit Task</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Task Title
                        </label>
                        <Input 
                            id="title"
                            type="text" 
                            name="title"
                            placeholder="Enter task title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>
                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="w-full cursor-pointer"
                    >
                        {processing ? 'Updating...' : 'Update Task'}
                    </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
