<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use App\Models\Board;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $board = Board::factory()->create([
            'user_id' => $user->id,
        ]);

        Task::factory(10)->create([
            'board_id' => $board->id,
        ]);
    }
}
