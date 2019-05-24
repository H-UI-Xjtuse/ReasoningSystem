//引入程序包
var express = require('express')
  , path = require('path')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

//设置日志级别
io.set('log level', 1); 

//WebSocket连接监听
io.on('connection', function (socket) {
  socket.emit('open');//通知客户端已连接

  // 打印握手信息
  // console.log(socket.handshake);

  // 构造客户端对象
  var client = {
    socket:socket,
    name:false,
    color:getColor()
  };
  
  // 对message事件的监听
  socket.on('message', function(msg){
    var obj = {time:getTime(),color:client.color};

    // 判断是不是第一次连接，以第一条消息作为用户名
    if(!client.name){
        client.name = msg;
        obj['text']=client.name;
        obj['author']='System';
        obj['type']='welcome';
        console.log(client.name + ' login');

        //返回欢迎语
        socket.emit('system',obj);
        //广播新用户已登陆
        socket.broadcast.emit('system',obj);
     }else{

        //如果不是第一次的连接，正常的聊天消息
        obj['text']=msg;
        obj['author']=client.name;      
        obj['type']='message';
        console.log(client.name + ' say: ' + msg);

        // 返回消息（可以省略）
        socket.emit('message',obj);
        // 广播向其他用户发消息
        socket.broadcast.emit('message',obj);
      }
    });

    //监听出退事件
    socket.on('disconnect', function () {  
      var obj = {
        time:getTime(),
        color:client.color,
        author:'System',
        text:client.name,
        type:'disconnect'
      };

      // 广播用户已退出
      socket.broadcast.emit('system',obj);
      console.log(client.name + 'Disconnect');
    });
  
});

//express基本配置
app.configure(function(){
  app.set('port', process.env.PORT || 3005);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// 指定webscoket的客户端的html文件
app.get('/', function(req, res){
    res.sendfile('views/index.html');
});


app.get('/reasoningEnvironment', function(req, res){
    res.sendfile('views/reasoningEnvironment.html');
});

app.get('/login', function(req, res){
    res.sendfile('views/index.html');
});

app.get('/index', function(req, res){
    res.sendfile('views/index.html');
});

app.get('/welcome', function(req, res){
    res.sendfile('views/welcome.html');
});

app.get('/welcome1', function(req, res){
    res.sendfile('views/welcome1.html');
});

app.get('/member-list', function(req, res){
    res.sendfile('views/member-list.html');
});

app.get('/member-list1', function(req, res){
    res.sendfile('views/member-list1.html');
});

app.get('/member-del', function(req, res){
    res.sendfile('views/member-del.html');
});
app.get('/member-add', function(req, res){
    res.sendfile('views/member-add.html');
});

app.get('/order-list', function(req, res){
    res.sendfile('views/order-list.html');
});
app.get('/order-list1', function(req, res){
    res.sendfile('views/order-list1.html');
});
app.get('/order-add', function(req, res){
    res.sendfile('views/order-add.html');
});

app.get('/test', function(req, res){
    res.sendfile('views/test.html');
});

app.get('/cate', function(req, res){
    res.sendfile('views/cate.html');
});
app.get('/city', function(req, res){
    res.sendfile('views/city.html');
});
app.get('/admin-list', function(req, res){
    res.sendfile('views/admin-list.html');
});app.get('/admin-role', function(req, res){
    res.sendfile('views/admin-role.html');
});
app.get('/admin-cate', function(req, res){
    res.sendfile('views/admin-cate.html');
});
app.get('/admin-add', function(req, res){
    res.sendfile('views/admin-add.html');
});
app.get('/admin-edit', function(req, res){
    res.sendfile('views/admin-edit.html');
});
app.get('/admin-rule', function(req, res){
    res.sendfile('views/admin-rule.html');
});
app.get('/admin-cate', function(req, res){
    res.sendfile('views/admin-cate.html');
});
app.get('/admin-listKuFile', function(req, res){
    res.sendfile('views/admin-listKuFile.html');
});


app.get('/echarts1', function(req, res){
    res.sendfile('views/echarts1.html');
});
app.get('/echarts2', function(req, res){
    res.sendfile('views/echarts2.html');
});
app.get('/echarts3', function(req, res){
    res.sendfile('views/echarts3.html');
});
app.get('/echarts4', function(req, res){
    res.sendfile('views/echarts4.html');
});
app.get('/echarts5', function(req, res){
    res.sendfile('views/echarts5.html');
});
app.get('/echarts6', function(req, res){
    res.sendfile('views/echarts6.html');
});
app.get('/echarts7', function(req, res){
    res.sendfile('views/echarts7.html');
});
app.get('/echarts8', function(req, res){
    res.sendfile('views/echarts8.html');
});

app.get('/log', function(req, res){
    res.sendfile('views/echarts8.html');
});
app.get('/unicode', function(req, res){
    res.sendfile('views/unicode.html');
});
app.get('/error', function(req, res){
    res.sendfile('views/error.html');
});
app.get('/demo', function(req, res){
    res.sendfile('views/demo.html');
});






server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
};

var getColor=function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
};