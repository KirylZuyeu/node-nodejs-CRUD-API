const PORT = process.env.PORT || 5000;
const Application = require('./framework/Application')
const userRouter = require('./src/user-router')
const jsonParse = require('./framework/parseJson')

const app = new Application();

app.use(jsonParse)
app.addRouter(userRouter)

app.listen(PORT, () => console.log(`Serverstrrted on PORT ${PORT}`))

