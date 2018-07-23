<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/8
 * Time: 13:09
 */

namespace app\index\controller;

use think\Controller;

class User extends Controller

{
    function index(){
        $url ='http://pms.beyondh.com:7998/Service/Crm/CrmService.svc?AddMember';
        $data =array(
            'Name'=>'测试',
            'Gender'=>'0',
            'Mobile'=>'18111222240',
            'IDType'=>'C01',
            'IDNo'=>'',
            'SourceType'=>'A',
            'SourceChannel'=>'A',
            'Level'=>'J',
            'StatusCode'=>'J',
        );
        $map =get_url($url,$data);
    var_dump($map);
    }
    //登录页面
    public function login(){
        return view();
    }
    //注册
    public function reg(){
        return view();
    }
}