import { ValidateInputUseCase } from '@/application/usecase/ValidateInputUseCase';

export class InputService {
  private validateInputUseCase: ValidateInputUseCase;

  constructor() {
    this.validateInputUseCase = new ValidateInputUseCase();
  }

  async handleSubmit(input: string) {
    try {
      const data = await this.validateInputUseCase.submit(input);
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
