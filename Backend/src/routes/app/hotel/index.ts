import express from 'express'

import Room from './room'

const Route = express.Router()

Route.use("/room", Room)

export default Route