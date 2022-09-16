<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [LoginController::class, 'login'])->name('login');
Route::post('registration', [RegistrationController::class, 'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('authenticated-user', function () {
        return auth()->user()->only('id','name','email');
    });
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('categories', [CategoryController::class,'index']);
    Route::apiResource('products', ProductController::class);
});
