const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const UserRouter = require('./routes/UserRouter')
const FeatRouter = require('./routes/FeatRouter')
const CommentRouter = require('./routes/CommentRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', UserRouter)
app.use('/feats', FeatRouter)
app.use('/comments', CommentRouter)

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))
