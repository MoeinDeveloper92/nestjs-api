import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class EncryptService {
  async hashPassword(enteredPassword: string): Promise<string> {
    const hash = await argon.hash(enteredPassword);

    return hash;
  }

  async comparePassword(
    hashPassword: string,
    enteredPassword: string,
  ): Promise<boolean> {
    const pwMatch = await argon.verify(hashPassword, enteredPassword);

    return pwMatch;
  }
}
