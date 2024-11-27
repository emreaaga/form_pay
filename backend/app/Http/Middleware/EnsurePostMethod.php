<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsurePostMethod
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
        if ($request->method() !== 'POST') {
            abort(404); // Return 404 if not a POST request
        }

        return $next($request);
    }
}
