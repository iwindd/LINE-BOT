import express from 'express'

import Config from './app/config';
import State from './app/state';

const Route = express.Router()

Route.use("/config", Config)
Route.use("/state", State) 

export default Route