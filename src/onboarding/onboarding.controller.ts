import { Controller, Post, Body } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller('onboarding')
export class OnboardingController {
constructor(private readonly onboardingService: OnboardingService) {}

 @Post()
create(@Body() newRegister: CreateRegisterDto) {
  return this.onboardingService.create(newRegister);
}
}
