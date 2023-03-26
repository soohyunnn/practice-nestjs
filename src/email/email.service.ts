import { Inject, Injectable } from '@nestjs/common';
import emailConfig from '../config/email.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.auth.user,
        pass: config.auth.pass,
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddre: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;
  }
}
