<?php

namespace App\Http\Controllers;

use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Site extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    public function index() {
        return view('welcome', $this->data);
    }
    public function auth(Request $request) {

        if($request->get('auth')) {
            $request_data = $request->get('auth');
            foreach($request_data as $key =>$value) {
                $request_data[$key] = AppServiceProvider::filter_input($key, $value);
            }

            $first_step = AppServiceProvider::myid_first_step();
            $second_step = AppServiceProvider::myid_second_step($first_step['array']);
            $params = [
                'session_id'=>$second_step['array']['session_id'],
                'pinfl'=>$request_data['pinfl'],
                'pass_data'=>$request_data['pass_data'],
                'birth_date'=>$request_data['birth_date'],
                'redirect_uri'=>'https://myid.uz',
                'iframe'=>true,
                'theme'=>'dark',
                'lang'=>'ru',
            ];

            $third_step = AppServiceProvider::myid_third_step(['send_data'=>$params]);
            return redirect($third_step['api_url']);
        }

    }

    public function get_csrf() {
        var_dump(csrf_token());die;
        echo csrf_token();
    }
}
