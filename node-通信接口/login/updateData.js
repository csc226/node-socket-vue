const { router, pool, Result } = require('../connect.js');
router.get('/updateData', function(req, res) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('连接数据库失败')
        } else {
            conn.query('update system_user set nickname="你猜猜",password="11111" where id="1"', function(err) {
                if (err) {
                    res.json('更新失败')
                } else {
                    res.json('更新成功')
                }
            })
        }
    })
})
router.get('/updateFriend', function(req, res) {
    console.log(req.query.introduce, req.query.time, req.query.time, req.query.sendId, req.query.anotherId)
    pool.getConnection((err, conn) => {
        conn.query('update newfriend_list set introduce="' + req.query.introduce + '",time="' + req.query.time + '",is_accept="1" where send_id="' + req.query.sendId + '" and another_id="' + req.query.anotherId + '"', (e, r) => {
            if (e) {
                res.json('失败')
            } else {
                res.json(r.changedRows)
            }
        })
    })
})
router.get('/acceptFriend', function(req, res) {
    // console.log(req.query.id)
    pool.getConnection((err, conn) => {
        conn.query('update newfriend_list set is_accept="' + req.query.isAccept + '" where id="' + req.query.id + '"', function(e, r) {
            if (r) {
                res.json(r.changedRows)
            }
        })
    })
})

router.get('/updateChatUerAccept', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('update chat_details set is_latest="0" where chat_id="' + req.query.chatId + '" and is_latest="1"', function(e, r) {

            if (e) {
                res.json('失败')
            } else if (r) {
                res.json(r.changedRows)
            }
        })
        conn.release()
    })
})

router.get('/friendListChat', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('update friend_list set chat_id="' + req.query.chatId + '" where user_id="' + req.query.userId + '" and another_id="' + req.query.anotherId + '"', (e, r) => {
            if (e) {
                res.json('错误')
            } else if (r) {
                res.json(r.changedRows)
            }
        })
    })
})
module.exports = router