<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Http\Requests\StoreBoardRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        Gate::authorize('viewAny', [Board::class, $user]);

        return Inertia::render('board/index', [
            'boards' => $user->boards()->latest()->get(),
            'success' => session('success'),
            'user' => $user
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user)
    {
        Gate::authorize('create', [Board::class, $user]);

        return Inertia::render('board/create', [
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request, User $user)
    {
        Gate::authorize('create', [Board::class, $user]);

        $board = $user->boards()->create($request->validated());

        return to_route('board.show', $board);
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        Gate::authorize('view', $board);

        return Inertia::render('board/show', [
            'board' => $board,
            'tasks' => $board->tasks()->latest()->limit(10)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Board $board)
    {
        Gate::authorize('update', $board);

        return Inertia::render('board/edit', [
            'board' => $board
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Board $board)
    {
        Gate::authorize('update', $board);

        $board->update($request->validated());

        return to_route('board.show', $board);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
        Gate::authorize('delete', $board);

        $board->delete();

        return to_route('user.board.index', $board->user);
    }
}
