import express from 'express'

const PORT = 5001

export const app = express()

app.use(express.json())
