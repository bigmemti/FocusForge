import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, User } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Create({ user }: { user: User }) {
    const { post, data, setData, errors, processing } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('user.board.store', { user }));
    }

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Boards',
            href: route('user.board.index', { user }),
        },
        {
            title: 'Create Board',
            href: route('user.board.create', { user }),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="container mx-auto p-4 mt-10">
                <Head title="Create Board" />
                <div className="flex flex-col gap-4 max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold">Create New Board</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Board Name
                            </label>
                            <Input 
                                id="name"
                                type="text" 
                                name="name"
                                placeholder="Enter board name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="w-full cursor-pointer"
                        >
                            {processing ? 'Creating...' : 'Create Board'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
