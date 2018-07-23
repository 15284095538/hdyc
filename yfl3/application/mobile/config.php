<?php
//配置文件
use \think\Request;

$basename = Request::instance()->root();
if (pathinfo($basename, PATHINFO_EXTENSION) == 'php') {
    $basename = dirname($basename);
}

return [
    // 模板参数替换
    'view_replace_str' => [
        '__CSS__' => $basename . '/mobile/css',
        '__JS__'    => $basename . '/mobile/js',
        '__LAY__'    => $basename . '/mobile/layui',
    ],
];