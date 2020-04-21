const { app, router, Result, pool } = require('../connect.js');
// 删除数据
router.get('/deleteData', function(req, res) {
    pool.getConnection(function(err, conn) {
        if (err) {
            return res.json('删除失败')
        }
        conn.query('delete from system_user where id=' + req.query.id)
        return res.json('删除成功')
            // conn.release()
    })

})


module.exports = router