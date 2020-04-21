var { app, pool, Result } = require('./connect')
var query = require('./login/query.js')
var deleteData = require('./login/deleteData.js')
var addData = require('./login/addData.js')
var updateData = require('./login/updateData.js')
app.all('*', function(req, res, next) {
    next()
})

app.get('/login', query) //第一个参数要和 接口名称相同否则获取不到
app.get('/getFriendList', query) //获取朋友列表
app.get('/getChatUser', query) //获取列表用户
app.get('/getChatDetails', query) //获取聊天详情
app.get('/getChatDetailsList', query) //获取聊天详情 列表
app.get('/searchFriend', query) //搜索朋友
app.get('/newFriendDetails', query) //新朋友的详情
app.get('/isFriend', query) // 判断是否朋友
app.get('/newFriend', query) // 获取新朋友列表
app.get('/isNewFriend', query) //判断是否新朋友
app.get('/isChatUser', query) //判断是否有聊天记录
app.get('/getChatUserOne', query) //通过发送者和接受者获取聊天主表的id

app.get('/deleteData', deleteData)
app.get('/addData', addData)
app.get('/addFriend', addData) //添加朋友
app.get('/addChatUser', addData) //添加主表 聊天记录
app.get('/addChatDetails', addData) //添加聊天详情记录


app.get('/updateData', updateData)
app.get('/updateFriend', updateData) //更新朋友 如果被绝交还可申请
app.get('/acceptFriend', updateData) //接受新朋友
app.get('/updateChatUerAccept', updateData) //接受新朋友
app.get('/friendListChat', updateData) //更新朋友列表的chat_id
    // app.get('/test', deleteData)
    // 192.168.1.125
    // 192.168.43.129
var server = app.listen(3000, '192.168.1.125', () => {
    let host = server.address().address;
    let port = server.address().port
    console.log('listening at http://%s:%s', host, port)
})