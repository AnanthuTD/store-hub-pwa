import { inputSchema, ValidatedInput } from '@/domain/models/InputValidation';
import { ValidationError } from '@/application/errors/ValidationError';
import axiosInstance from '@/config/axios';

export class ValidateInputUseCase {
  validate(input: string): ValidatedInput {
    const result = inputSchema.safeParse(input);
    if (!result.success) {
      throw new ValidationError(result.error.errors);
    }
    return result.data;
  }

  async submit(input: string) {
    const validatedInput = this.validate(input);
    try {
      const response = await axiosInstance.post('/api/validate', { input: validatedInput });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
