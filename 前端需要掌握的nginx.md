nginx主要是公司运维同学必须掌握的知识，涉及到反向代理、负载均衡等服务器配置。前端开发尤其是纯前端开发来说对nginx接触的并不多，但是在一些情况下，nginx还是需要前端自己来搞；例如我们公司的开发环境和测试环境，虽然qa可以帮助搞定配置，但是每新增一个前端模块或者模块nginx配置经常变更都求着qa搞，麻烦别人还不如自己来搞，这样更能理解自己的需求。这些都需要前端开发对nginx有所理解，下面我们来说说nginx最基础的server和location匹配规则。

1. server匹配规则
nginx的server块可以配置多个，那么一个请求该匹配那个server块呢，这主要是根据server块的server_name和listen来决定的。其中server_name仅仅检查请求的“Host”头以决定该请求应由哪个虚拟主机来处理。

先看一个例子：
```
server {
    listen      8001;
    server_name *.net;
}

server {
    listen      8001;
    server_name baidu.net;
}

server {
    listen      8001;
    server_name baidu.*;
}
```
通过测试，发现相同listen端口的情况下，多个server的匹配顺序如下：

完全匹配优先级最高，匹配则终止
通配符在前的优先级其次，如*.com
通配符在后的优先级次之，如baidu.*
正则匹配优先级最低，如~^.www.test.com$
以上若都没有匹配，那么其会走默认的server，即：

优先选择listen配置项后有default或default_server的server，若没有则：
找到匹配listen端口的第一个server块
一种特殊情况，如果nginx中只为某个listen端口配置一个server块的话，那么nginx是不会根据该端口的server_name进行匹配的。因为只有一个server域，那么根据上面没有匹配的规则的情况下会走第一个匹配listen端口的server块。

``` 
server {
    listen    8001;
    server_name baidu.net;
}
server { # server没有配置listen的话，root用户默认是80端口，非root用户默认8080
    server_name server.com; 
}
```

如上面8001端口只有一个server的情况下，任何server_name访问server_name:8001都会匹配上面server块（前提是server_name对应域名能请求到该机器上）。

另一种特殊情况，server块配置的虚拟主机是基于域名和IP混合的。如下所示：
```
server {
    listen      192.168.1.1:8001;
    server_name example.org www.example.org;
    ...
}
server {
    listen      192.168.1.1:8002;
    server_name example.com www.example.com;
    ...
}
```
这种情况下，其匹配顺序是：

首先，看请求的IP地址和端口是否匹配某个server配置块中的listen指令配置，匹配则命中该server块，否则执行以下
其次，看请求的Host头是否匹配这个server块中的某个server_name的值，匹配这命中，否则走默认server。
第二点需要补充一下，看请求的Host头是否匹配server_name，要满足一个条件，即通过server_name指定的域名可以访问到当前nginx配置所在的机器，因为通过域名访问nginx所在的机器最终还是通过ip的形式来访问的。

比如，访问www.example.org，最终通过dns解析出nginx所在的ip地址来进行访问的，又因为该server监听8001端口，所以通过www.example.org:8001也可以命中192.168.1.1:8001所在的server块。

2. location匹配规则
一个示例：
```
location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ]
}

location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ]
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ]
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/Abc 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ]
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ]
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ]
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ]
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ]
}

location ~* /js/.*/\.js {
  # 不区分大小写匹配
  [ configuration I ]
}
```
以= 开头表示精确匹配，匹配则终止后续查找；如 A 中只匹配根目录结尾的请求，后面不能带任何字符串.
以^~ 开头表示uri以某个常规字符串开头，不是正则匹配，匹配则终止后续查找，包括正则匹配，它依然支持最长匹配原则
以~ 开头表示区分大小写的正则匹配;
以~* 开头表示不区分大小写的正则匹配
以/ 通用匹配, 如果没有其它匹配,任何请求都会匹配到
location 顺序 no优先级：

关于location的优先级需要认知三点：

先匹配普通location，后匹配正则location；因为正则会覆盖普通
普通location匹配与顺序无关，因为采用最长匹配原则；正则location匹配与顺序有关，但是正则location依然采用最长匹配原则
普通location指定了^~则一旦该普通规则匹配上，则不会进行后续匹配了，即使是正则匹配；=严格匹配一旦匹配，也不会后续正则匹配
所以，location的优先级如下：

(location =) > (location ^~ 路径) > (location ~,~* 正则顺序) > (location 完整路径)  >  (location 部分起始路径) > (/)
按照上面的location写法，以下的匹配示例成立：

/ -> config A
精确完全匹配，即使/index.html也匹配不了
/downloads/download.html -> config B
匹配B以后，往下没有任何匹配，采用B
/images/1.gif -> configuration D
匹配到F，往下匹配到D，停止往下
/images/abc/def -> config D
最长匹配到G，往下匹配D，停止往下
你可以看到 任何以/images/开头的都会匹配到D并停止，FG写在这里是没有任何意义的，H是永远轮不到的，这里只是为了说明匹配顺序
/documents/document.html -> config C
匹配到C，往下没有任何匹配，采用C
/documents/1.jpg -> configuration E
匹配到C，往下正则匹配到E
/documents/Abc.jpg -> config CC
最长匹配到C，往下正则顺序匹配到CC，不会往下到E
实际使用建议
所以实际使用中，个人觉得至少有三个匹配规则定义，如下：
#直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
#这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
```
location = / {
    proxy_pass http://tomcat:8080/index
}
```
# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
```
location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}
```
#第三个规则就是通用规则，用来转发动态请求到后端应用服务器
#非静态文件请求就默认是动态请求，自己根据实际把握
#毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
```
location / {
    proxy_pass http://tomcat:8080/
}
```
