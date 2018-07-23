<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/8
 * 优惠活动
 * Time: 12:33
 */
namespace app\index\controller;
use Think\Cache\Driver\Db;
use Think\Page;

class Preferential extends \think\Controller{
    function index(){
        $list =db('youhui')->field('id,map,title')->paginate(4);
        $this->view->assign("list", $list);
        return view();
    }
    //优惠活动详情页面
    public function lists($id){
        $list =db('youhui')->where('id',$id)->field('id,map,title,content,time')->find();
        $arr =array(
            'id'=>$list['id'],
            'title'=>$list['title'],
            'map'=>$list['map'],
            'time'=>$list['time'],
            'content'=>htmlspecialchars_decode($list['content']),
        );
        $this->view->assign("list", $arr);
        return view();
    }
}
