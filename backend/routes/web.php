<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', ['uses'=>'App\Http\Controllers\Site@index']);
Route::get('/auth', ['uses'=>'App\Http\Controllers\Site@auth']);
Route::get('/site/get_csrf', ['uses'=>'App\Http\Controllers\Site@get_csrf']);
