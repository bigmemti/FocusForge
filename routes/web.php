<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::redirect('/', '/task')->name('home');

Route::resource('task', TaskController::class);

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
