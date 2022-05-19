import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {

  // create a feedback
  it('should be able to create a feedback', async () => {
    await expect(submitFeedback.create({
      type: "bug",
      comment: "ta mt bugado",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
  })

  it('should not be able to create a feedback if type was not informed', async () => {
    await expect(submitFeedback.create({
      type: "",
      comment: "ta mt bugado",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).rejects.toThrow()
  })

  it('should not be able to create a feedback if comment was not informed', async () => {
    await expect(submitFeedback.create({
      type: "bug",
      comment: "",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).rejects.toThrow()
  })

  it('should not be able to create a feedback if screenshot was informed, but is invalid', async () => {
    await expect(submitFeedback.create({
      type: "bug",
      comment: "ta mt bugado!!!",
      screenshot: "teste1"
    })).rejects.toThrow()
  })

  // send feedback
  it('should be able to send email', async () => {
    await expect(submitFeedback.sendMail({
      type: "bug",
      comment: "ta mt bugado issoo!!!",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).resolves.not.toThrow()

    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to send email if type was not informed', async () => {
    await expect(submitFeedback.sendMail({
      type: "",
      comment: "ta mt bugado issoo!!!",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).rejects.toThrow()
  })

  it('should not be able to send email if comment was not informed', async () => {
    await expect(submitFeedback.sendMail({
      type: "bug",
      comment: "",
      screenshot: "data:image/png;base64,12kk1jj1k"
    })).rejects.toThrow()
  })

  it('should not be able to send email if screenshot was informed, but is invalid', async () => {
    await expect(submitFeedback.sendMail({
      type: "bug",
      comment: "ta mt bugado issoo!!!",
      screenshot: "teste1"
    })).rejects.toThrow()
  })
})