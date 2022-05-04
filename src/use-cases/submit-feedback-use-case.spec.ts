import { SubmitFeedBackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedBackUseCase(
  { create: createFeedbackSpy },
  { sendEmail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback ', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64',
      })
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })
  it('should not be able to submit a feedback without type ', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64',
      })
    ).rejects.toThrow()
  })
  it('should not be able to submit a feedback without comment ', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64',
      })
    ).rejects.toThrow()
  })
  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'dekewoes',
      })
    ).rejects.toThrow()
  })
})
