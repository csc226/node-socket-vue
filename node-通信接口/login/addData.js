const { router, pool, Result } = require('../connect.js');
router.post('/addData', function(req, res) {
    pool.getConnection((err, conn) => {
        console.log('nickname:', req.query.nickname, 'password:', req.query.password)
        conn.query('select * from system_user where nickname="' + req.query.nickname + '"', function(e, r) {
            console.log(r)
            if (r.length != 0) {
                res.json('已存在')
            } else {
                conn.query('insert into system_user(nickname,password) value("' + req.query.nickname + '","' + req.query.password + '")', function(err) {
                    // conn.query('insert into system_user(nickname,password) value("陈晨","122")', function(err) {
                    if (err) {
                        res.json('添加失败')
                    } else {
                        res.json('添加成功')
                            // let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))"
                            // let dataBase = "create table " + req.query.nickname + "(id int auto_increment,user_id varchar(255),status tinyint(255),primary key(id))"
                            // conn.query(dataBase, (e, r) => {
                            //     if (e) {
                            //         console.log(e)
                            //             // res.json('创建失败')
                            //     } else {
                            //         console.log(r)
                            //             // res.json('创建成功')
                            //     }


                        // })
                    }
                })
            }
        })

        // res.json('添加成功')

        conn.release()
            // pool.releaseConnection(conn)
            // 并发访问时，通过conn.release()释放连接死活不成功，导致一定访问达到连接数上限后，pool.getConnection直接卡死没有任何的回调！ 
            // 改成pool.releaseConnection(conn)才okay！

    })
})
router.get('/addFriend', function(req, res) {
        console.log(req.query.userId, req.query.anotherId, req.query.time, req.query.introduce)
        pool.getConnection((err, conn) => {
            conn.query('insert into newfriend_list(send_id,another_id,time,introduce,is_accept) value("' + req.query.userId + '","' + req.query.anotherId + '","' + req.query.time + '","' + req.query.introduce + '","1")', function(e, r) {
                if (r) {
                    res.json('成功')
                } else {
                    res.json('失败')
                }
            })
        })
    })
    // chat_user添加记录 增加聊天记录
router.get('/addChatUser', function(req, res) {
    pool.getConnection((err, conn) => {
        conn.query('insert into chat_user(user_id,another_id,another_avatar,user_avatar) value("' + req.query.userId + '","' + req.query.anotherId + '","' + req.query.anAvatar + '","' + req.query.userAvatar + '")', function(e, r) {
            if (e) {
                res.json('错误')
            } else if (r) {
                res.json(r)
            }
        })
    })
})

router.get('/addChatDetails', function(req, res) {
    pool.getConnection((err, conn) => {
        conn.query('insert into chat_details(chat_id,user_id,content,time,type,is_latest,user_avatar) value("' + req.query.chatId + '","' + req.query.userId + '","' + req.query.content + '","' + req.query.time + '","' + req.query.type + '","1","' + req.query.userAvatar + '")', (e, r) => {
            if (e) {
                res.json('错误')
            } else if (r) {
                res.json(new Result({ msg: '成功', data: r }))
            }
        })
    })
})
module.exports = router