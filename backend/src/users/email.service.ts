import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 메일 옵선 타입. 수신자(to), 메일 제목, html 형식의 메일 본문을 가짐
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  // nodemailer에서 제공하는 Transporter 객체 생성
  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendVerifyToken(email: string, verifyToken: number) {
    // 이 링크를 통해 우리 서비스로 이메일 인증 요청이 들어옴

    // 메일 본문 구성 form 태그를 이용해 POST 요청 실시
    const mailOptions: EmailOptions = {
      to: email,
      subject: '[찰칵] 이메일 확인',
      html: `
        인증번호: ${verifyToken}
      `
    }
    
    // transporter 객체를 이용해 메일 전송
    return await this.transporter.sendMail(mailOptions);
  }
}