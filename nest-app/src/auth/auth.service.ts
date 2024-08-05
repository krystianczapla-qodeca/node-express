import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '.prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string): Promise<User> {
        const user = await this.userService.findOneByEmail(email);
    
        return user;
    }

    generateTokens(user: User) {
        const payload = { sub: user.id, email: user.email, roles: [user.type] };
        console.log('Generated JWT payload:', payload); 
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
