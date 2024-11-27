<?php

namespace App\Http\Controllers;

use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Api extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    public function get_csrf() {
        echo "Hallo world!<br/>";

       echo csrf_token();
    }


}
