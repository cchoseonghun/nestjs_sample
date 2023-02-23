import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}

  async sendVerification(email: string) {
    const verifyToken = this.generateRandomNumber();
    
    console.log('캐싱할 데이터: ', email, verifyToken);
    // TODO: verifyToken이랑 이메일 캐싱

    await this.sendVerifyToken(email, verifyToken);
  }
  
  async sendVerifyToken(email: string, verifyToken: number) {
    await this.emailService.sendVerifyToken(email, verifyToken);
  }

  async verifyEmail(email:string, verifyToken: number) {
    console.log('verifyEmail: ', email, verifyToken);
    // TODO: 캐싱된 데이터 찾기. 있으면 200, 없으면 Exception
    return;
  }

  private generateRandomNumber(): number {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
