import _ from 'lodash';
import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EmailService } from './email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  async sendVerification(email: string) {
    const verifyToken = this.generateRandomNumber();
    await this.cacheManager.set(email, verifyToken);
    await this.sendVerifyToken(email, verifyToken);
  }
  
  async sendVerifyToken(email: string, verifyToken: number) {
    await this.emailService.sendVerifyToken(email, verifyToken);
  }

  async verifyEmail(email:string, verifyToken: number) {
    const cache_verifyToken = await this.cacheManager.get(email);
    if (_.isNil(cache_verifyToken)) {
      throw new NotFoundException('해당 메일로 전송된 인증번호가 없습니다.');
    } else if (cache_verifyToken !== verifyToken) {
      throw new UnauthorizedException('인증번호가 일치하지 않습니다.');
    } else {
      await this.cacheManager.del(email);
    }
  }

  private generateRandomNumber(): number {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }
}
