const { router, Result, pool } = require('../connect.js');
router.get('/login', (req, res) => {
    pool.getConnection((err, conn) => {
        // console.log(req.query.nickname, req.query.password)
        // conn.query('select * from system_user where nickname="陈晨" and password="122"', (err, r) => {
        conn.query('select * from system_user where nickname="' + req.query.nickname + '" and password="' + req.query.password + '"', (err, r) => {
                if (err) {
                    res.json('登录失败')
                } else {
                    // console.log(r.length, r)
                    if (r.length == 0) {
                        res.json('登录失败')
                            // console.log(r.lenght)
                    } else {
                        res.json(new Result({ msg: '登录成功', data: r }))
                    }
                }

            }

        )
        conn.release()
    })
})
router.get('/getFriendList', (req, res) => {
    // console.log(req.query.userId)
    pool.getConnection((err, conn) => {
        conn.query('select * from friend_list where user_id="' + req.query.userId + '"', (e, r) => {
            res.json(r)
        })
        conn.release()
    })
})
router.get('/isFriend', (req, res) => {
    // console.log(req.query.userId)
    pool.getConnection((err, conn) => {
        conn.query('select * from friend_list where user_id="' + req.query.userId + '" and another_id="' + req.query.nickname + '"', (e, r) => {
            res.json(r)
        })
        conn.release()
    })
})
router.get('/getChatUser', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from chat_user where user_id="' + req.query.userId + '"', (e, r) => {
            if (e) {
                res.json('失败')
            } else if (r) {
                if (r.length != 0) {
                    res.json(new Result({ msg: '成功', data: r }))
                } else {
                    conn.query('select * from chat_user where another_id="' + req.query.userId + '"', (e, r) => {
                        if (e) {
                            res.json('失败')
                        } else if (r) {
                            res.json(new Result({ msg: '成功', data: r }))
                        }
                    })
                }
            }
        })


        conn.release()
    })
})
router.get('/getChatDetails', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from chat_details where chat_id="' + req.query.chatId + '" and is_latest="1"', function(e, r) {
            if (e) {
                res.json('失败')
            } else if (r) {
                res.json(new Result({ msg: '成功', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/getChatDetailsList', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from chat_details where chat_id="' + req.query.chatId + '"', function(e, r) {
            if (e) {
                res.json('失败')
            } else if (r) {
                res.json(new Result({ msg: '成功', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/isChatUser', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from chat_user where user_id="' + req.query.userId + '" and another_id="' + req.query.anotherId + '"', function(e, r) {
            if (e) {
                res.json('错误')
            } else
            if (r.length == 0) {
                res.json('不存在')
            } else {
                res.json(new Result({ msg: '存在', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/getChatUserOne', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from chat_user where user_id="' + req.query.userId + '" and another_id="' + req.query.anotherId + '"', (e, r) => {
            if (e) {
                res.json('失败')
            } else if (r) {
                if (r.length != 0) {
                    res.json(new Result({ msg: '成功', data: r }))
                } else {
                    conn.query('select * from chat_user where another_id="' + req.query.userId + '" and user_id="' + req.query.anotherId + '"', (e, r) => {
                        if (e) {
                            res.json('失败')
                        } else if (r) {
                            res.json(new Result({ msg: '成功', data: r }))
                        }
                    })
                }
            }
        })


        conn.release()
    })
})

router.get('/searchFriend', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select nickname,avatar,sex,id from system_user where nickname="' + req.query.nickname + '"', function(e, r) {
            if (e) {
                res.json('数据库查询失败')
            } else if (r.length == 0) {
                res.json('不存在')
            } else {
                res.json(new Result({ msg: '存在', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/newFriendDetails', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select nickname,avatar,sex,id from system_user where id="' + req.query.sendId + '"', function(e, r) {
            if (e) {
                res.json('数据库查询失败')
            } else if (r.length == 0) {
                res.json('不存在')
            } else {
                res.json(new Result({ msg: '存在', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/newFriend', (req, res) => {
    // console.log(req.query.userId)
    pool.getConnection((err, conn) => {
        conn.query('select * from newfriend_list where another_id="' + req.query.userId + '" and is_accept="1"', function(e, r) {
            if (r) {
                res.json(new Result({ msg: '成功', data: r }))
            }
        })
        conn.release()
    })
})
router.get('/isNewFriend', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from newfriend_list where send_id="' + req.query.sendId + '" and another_id="' + req.query.anotherId + '"', (e, r) => {
            if (e) {
                res.json('失败')
            } else if (r) {
                if (r.length == 0) {
                    res.json('不存在')
                } else {
                    res.json(new Result({ msg: '存在', data: r }))
                }
            }
        })
        conn.release()
    })
})

// router.get('/getMyInfo', (req, res) => {
//     pool.getConnection((err,conn)=>{
//         conn.query('select * from system')
//     })
// })
module.exports = router