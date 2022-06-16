const Router = require('../framework/Router');
const router = new Router()

const users = [
    {id: 1, name: 'Ulbi tv'},
    {id: 2, name: 'Vasya'}
]

router.get('/users', (req, res) => {
    res.send(users)
})

router.post('/users', (req, res) => {
    res.send(users)
})

module.exports = router