<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PopulateSessionUserId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // If a user is authenticated, update the user_id in the session table
        if (Auth::check()) {
            DB::table('sessions')
                ->where('id', session()->getId()) // Match the session ID
                ->update(['user_id' => Auth::id()]);
        }

        return $response;
    }
}
