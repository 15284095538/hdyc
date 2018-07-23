<?php
namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        $list =db('youhui')->field('id,map,title,dec')->order('id desc')->limit(5)->select();
        $this->view->assign('list',$list);
        return view();
    }
}
