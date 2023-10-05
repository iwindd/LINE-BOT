import express from 'express'

import Config from './app/config';
import State from './app/state';
import Hotel from './app/hotel';

const Route = express.Router()

Route.use("/config", Config)
Route.use("/state", State) 

Route.use("/hotel", Hotel)

export default Route