<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\AppServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Data;
use Illuminate\Support\Facades\Session;

class Site extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        parent::__construct();

    }

    public function index() {
        return view('welcome', $this->data);
    }
    public function auth(Request $request) {

        if($request->post('auth')) {
            $request_data = $request->post('auth');
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
                'redirect_uri'=>'http://127.0.0.1:5173/card',
                'iframe'=>true,
                'theme'=>'dark',
                'lang'=>'ru',
            ];

            $third_step = AppServiceProvider::myid_third_step(['send_data'=>$params]);

            if(isset($third_step['api_url'])) {
                $row = DB::table(MYID_DB_TABLE['table'])->select(DB::raw('id, session_id'))->where(['session_id'=>$params['session_id']])->where('status','>',0)->first();
                $row = User::where(['session_id'=>$params['session_id']])->first();
                $row = (array)$row;
                $result_row = null;
                $info_data = [];

                $info_data = array_merge($info_data, $request_data);
                if(empty($row['id'])) {

                    $info_data['id'] = Data::get_sequence(MYID_DB_TABLE['sequence'])[0]->nextval;
                    $info_data['session_id'] = $params['session_id'];
                    $info_data['redirect_uri'] = $params['redirect_uri'];
                    $info_data['name'] = $info_data['pinfl'];
                    $set_session = \session()->put('user', $info_data);
                    if(\session()->get('user')) {
                        $result_row = DB::table(MYID_DB_TABLE['table'])->insert($info_data);
                    }
                } else {
                    $result_row = DB::table(MYID_DB_TABLE['table'])->where(['id'=>$row['id']])->where('status','>',0)->update($info_data);
                }
                if($result_row) {
                    var_dump(Auth::check());die;
                    if (Auth::attempt($info_data, true)) {
                        $request->session()->regenerate();
                        if (Auth::user()->user_type == 'Administrator')
                        {
                            return redirect()->intended('admin/dashboard');
                        } else {
                            return redirect()->intended('dashboard');
                        }
                    }

                    $set_session_user_id = DB::table('sessions')
                        ->where('id', session()->getId()) // Match the session ID
                        ->update(['user_id' => $info_data['id']]);
                    if($set_session_user_id) {
                        return $third_step['api_url'];
                    }

                }

            } else {

            }

        }

    }

    public function signin(Request $request) {
        $result_row = null;
        if($request->get('session_id') && $request->get('auth_code')) {
            $request_data = [
                'session_id'=>$request->get('session_id'),
                'auth_code'=>$request->get('auth_code')
            ];
            foreach ($request_data as $key => $value) {
                $request_data[$key] = AppServiceProvider::filter_input($key, $value);
            }
            $row = DB::table(MYID_DB_TABLE['table'])->select(DB::raw('id, session_id'))->where(['session_id'=>$request_data['session_id']])->where('status','>',0)->first();
            $row = (array)$row;
            if(isset($row['id'])) {
                $result_row = DB::table(MYID_DB_TABLE['table'])->where(['id'=>$row['id']])->where('status','>',0)->update($request_data);
            } else {
                abort(404);
            }

            if($result_row) {
                echo "<h1>OK</h1>";
            }
        }
    }

    public function get_csrf(Request $request) {

        echo csrf_token();
    }

}
