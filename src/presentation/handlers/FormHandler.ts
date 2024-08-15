import { InputService } from '@/infrastructure/services/InputService';

const inputService = new InputService();

const handleSubmit = async (input: string) => {
  await inputService.handleSubmit(input);
};

export { handleSubmit };
