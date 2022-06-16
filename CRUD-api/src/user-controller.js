const users = [
    {id: 1, name: 'Ulbi tv'},
    {id: 2, name: 'Vasya'}
]

const getUsers = (req, res) => {
    if (req.params.id) {
        return res.send(users.find(user => user.id == req.params.id))
    }
    res.send(users)
}

const createUser = (req, res) => {
    console.log(req.body)
    const user = req.body
    users.push(user);
    res.send(user)
}

module.exports = {
    getUsers,
    createUser
}