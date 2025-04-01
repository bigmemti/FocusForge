<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Board;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        Gate::authorize('viewAny', [Task::class, $board->user]);

        return Inertia::render('task/index', [
            'tasks' => $board->tasks()->orderBy('status')->orderBy('priority')->get(),
            'success' => session()->get('success'),
            'board' => $board,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Board $board)
    {
        Gate::authorize('create', [Task::class, $board->user]);

        return Inertia::render('task/create', [
            'board' => $board,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Board $board)
    {
        $board->tasks()->create($request->validated());
        
        return redirect()->route('board.task.index', $board)->with('success', 'Task created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        Gate::authorize('update', $task);

        return Inertia::render('task/edit', [
            'task' => $task,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return redirect()->route('board.task.index', $task->board)->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);

        $task->delete();

        return redirect()->route('board.task.index', $task->board)->with('success', 'Task deleted successfully');
    }
}
