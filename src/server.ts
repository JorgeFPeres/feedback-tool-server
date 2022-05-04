import express from 'express'
import { prisma } from './prisma'
import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '645bed11fd6fa1',
    pass: 'd770ffc6cb4a34',
  },
})

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    },
  })

  transport.sendMail({
    from: 'Equipe Feedget <oi@feedget,com>',
    to: 'Jorge Fernando <jorge-peres@live.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `<div>`,
    ].join(''),
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('running...')
})

//SQLite
