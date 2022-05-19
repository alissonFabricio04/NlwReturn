import { Router, Request, Response } from 'express'

import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedback-repository'
import { NodeMailerMailAdapter } from '../adapters/mail/nodemailer-mail-adapter'
import { SubmitFeedbackUseCase } from '../use-cases/submit-feedback-use-case'

export const routes = Router()

routes.post('/feedbacks', async (req: Request, res: Response) => {
  const { type, comment, screenshot } = req.body

  if(!type || !comment) return res.status(400).json({ message: "action impossible to complete" })

  const prismaFeedbackRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodeMailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  )

  try {
    await submitFeedbackUseCase.create({ type, comment, screenshot })
    await submitFeedbackUseCase.sendMail({ type, comment, screenshot })

    return res.status(201).send()
  } catch {
    return res.status(503).json({ message: "action impossible to complete" })
  }

  /* 
    return wasCreated || wasSend ? 
      res.status(201).json({ status: wasCreated }) :
      res.status(503).json({ message: "action impossible to complete" })
  */
})

