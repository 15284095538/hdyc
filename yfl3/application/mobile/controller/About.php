<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/16
 * Time: 16:29
 */

namespace app\mobile\controller;
use think\Controller;
class About extends Controller{

    function __construct()
    {
        parent::__construct();
        require_once EXTEND_PATH.'phpmailer/functions.php';
    }

    function index(){
       return view();
   }
    //发送邮件
    public function mail(){
        $send =new \Mail();
        $info = input('post.');
        foreach ($info as $key=>$value){
            $info[$key] = $this->cleanInput($value);
        }
        switch ($info['infoType']){
            case 'gd':
                $title = "您有一条关于“成为股东”的新消息,来自微信公众号";
                $content="
        <p>我要成为股东：</p>
        <p>姓名：".$info['gd_name']."</p>
        <p>电话：".$info['gd_tell']."</p>
        <p>计划投资金额（万元）：".$info['gd_money']."</p>
        <p>理想投资城市：".$info['gd_city']."</p>
        ";
                $ym = '股东';
                break;
            case 'jm':
                $title = "您有一条关于“加盟”的新消息,来自微信公众号";
                $content="
        <p>我要加盟信息：</p>
        <p>姓名：".$info['jm_name']."</p>
        <p>电话：".$info['jm_tell']."</p>
        <p>物业名称：".$info['jm_wyname']."</p>
        <p>详细地址：".$info['jm_xxplace']."</p>
        <p>建筑面积（㎡）：".$info['jm_jzmj']."</p>
        <p>房间数：".$info['jm_room']."</p>
        <p>是否有独立大堂：".$info['jm_dt']."</p>
        <p>电梯：".$info['jm_dt2']."</p>
        <p>店招数量：".$info['jm_dzsl']."</p>
        <p>其他备注：".$info['jm_qtbj']."</p>
        ";
                $ym = '加盟';
                break;
            case 'tg':
                $title = "您有一条关于“酒店托管”的新消息,来自微信公众号";
                $content="
        <p>我要托管酒店详细信息：</p>
        <p>姓名：".$info['tg_name']."</p>
        <p>电话：".$info['tg_tell']."</p>
        <p>酒店名称：".$info['tg_jdmc']."</p>
        <p>酒店地址：".$info['tg_jddz']."</p>
        <p>建筑面积（㎡）：".$info['tg_jzmj']."</p>
        <p>房间数：".$info['tg_room']."</p>
        <p>酒店平均房价：".$info['tg_pjfj']."</p>
        <p>电梯：".$info['tg_dt']."</p>
        <p>停车位数量：".$info['tg_tcw']."</p>
        <p>大厅面积（㎡）：".$info['tg_dating']."</p>
        <p>会议室面积（㎡）：".$info['tg_meet']."</p>
        <p>茶坊面积（㎡）：".$info['tg_chafang']."</p>
        <p>其他备注：".$info['tg_qtbz']."</p>
        ";
                $ym = "托管";
                break;
        }
        $flag=  $send->sendMail('shcguanyfl@163.com',$title,$content);

        if($flag){
            echo "<div style='margin: 400px auto;text-align: center;width: 100%;'>
             <img src='../images/ok.png' alt=''>
            <p style='font-size:50px;'>提交成功</p>
            <p style='font-size:400%;'>".$ym."热线:4000 800 336</p>
            </div>";
        }else{
            echo "<div style='text-align: center;width: 100%'>
             <img src='../images/ok.png' alt=''>
            <p>提交失败</p>
            </div>";
        }
    }
    function cleanInput($input) {

        $search = array(
            '@<script[^>]*?>.*?</script>@si',   // Strip out javascript
            '@<[\/\!]*?[^<>]*?>@si',            // Strip out HTML tags
            '@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
            '@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments
        );
        $output = preg_replace($search, '', $input);
        return $output;
    }
    //托管
    public function deposit(){
        return view('deposit');
    }
    //成为股东
    public function stockholder(){
        return view('stockholder');
    }
}