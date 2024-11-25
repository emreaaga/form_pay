<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }

    public static function myid_first_step() {
        $send_data = [
          'grant_type'=>MYID_GRANT_TYPE,
          'client_id'=>MYID_CLIENT_ID,
          'client_secret'=>MYID_CLIENT_SECRET,
        ];
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL=>'https://devmyid.uz/api/v1/oauth2/access-token',
            CURLOPT_RETURNTRANSFER=>true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=>$send_data,
            ]);
        $result = curl_exec($curl);
        curl_close($curl);
        $receive = json_decode($result, true);
        return [
            'json'=>$result,
            'array'=>$receive,
        ];
    }

    public static function myid_second_step($params) {
        $token = $params['access_token'];
        $authorization = 'Authorization: Bearer '. $token;
        $cheaders = [
          'Content-type: application/json',
          $authorization,
        ];
        $send_data = [
          'max_retries'=>5,
          'external_id'=>2,
          'ip_address'=> "185.217.131.20",
        ];
        $send_data_json = json_encode($send_data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL=>'https://devmyid.uz/api/v1/web/sessions',
            CURLOPT_HTTPHEADER=>$cheaders,
            CURLOPT_RETURNTRANSFER=>true,
            CURLOPT_CUSTOMREQUEST=>'POST',
            CURLOPT_POSTFIELDS=> $send_data_json,
        ]);
        $result = curl_exec($curl);
        curl_close($curl);
        $receive = json_decode($result, true);
        return [
            'json'=>$result,
            'array'=>$receive,
        ];
    }

    public static function myid_third_step($params) {
        $send_data = $params['send_data'];
        $send_data = http_build_query($send_data);
        $api_url = 'https://web.devmyid.uz?'.$send_data;
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL=>$api_url,
            CURLOPT_RETURNTRANSFER=>true,
            CURLOPT_CUSTOMREQUEST=>'GET',
        ]);
        $result = curl_exec($curl);
        curl_close($curl);
        return
            [
             'result'=>$result,
             'api_url'=>$api_url
            ];
    }

    public static function filter_input($name, $input) {
        if(is_array($input)) {
            $input_as_arr = implode(',', $input);
            $input = $input_as_arr;
        }
        else {
            $input = trim(htmlspecialchars(strip_tags($input)));
        }
        if(strpos($name, 'date')!==false) {
            $input = date('Y-m-d', strtotime($input));
        }
        return $input;
    }
}
