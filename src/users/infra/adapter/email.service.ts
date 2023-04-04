import { Injectable } from '@nestjs/common';
import { IemailService } from '../../application/adapter/iemail.service';
import { EmailService as ExternalEmailService } from '../../../email/email.service';

@Injectable()
export class EmailService implements IemailService {
  constructor(private emailService: ExternalEmailService) {}

  async sendMemberJoinVerification(
    email: string,
    signupVerifyToken: string,
  ): Promise<void> {
    this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
