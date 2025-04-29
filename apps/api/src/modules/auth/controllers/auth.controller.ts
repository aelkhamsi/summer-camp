import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/sign-up.dto';
import { Public } from 'src/decorators/public.decorator';
import { LoginAdminDto } from '../dto/login-admin.dto';
import { SignupAdminDto } from '../dto/sign-up-admin.dto';
import { ADMIN_ROLE } from 'src/constants';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('sc-api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res, @Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const loginResponse = await this.authService.login(email, password);
    const token = loginResponse?.access_token;
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
      maxAge: 3600 * 1000,
    });
    res.send(loginResponse);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const { firstName, lastName, email, password } = signupDto;
    await this.authService.signup(firstName, lastName, email, password);

    return {
      message: 'New account created',
      statusCode: 200,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login/admin')
  loginAdmin(@Body() loginAdminDto: LoginAdminDto) {
    const { username, password } = loginAdminDto;
    return this.authService.loginAdmin(username, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup/admin')
  @UseGuards(RolesGuard)
  @Roles(ADMIN_ROLE)
  async signupAdmin(@Body() signupAdminDto: SignupAdminDto) {
    const { username, password } = signupAdminDto;
    await this.authService.signupAdmin(username, password);

    return {
      message: 'New account created',
      statusCode: 200,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    const { email } = body;
    await this.authService.resetPassword(email);

    return {
      statusCode: 200,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('send-email-verification')
  async sendEmailVerification(@Body() body: { email: string }) {
    const { email } = body;
    await this.authService.sendEmailVerificationCode(email);

    return {
      statusCode: 200,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  async verifyEmail(@Body() body: { email: string; verificationCode: string }) {
    const { email, verificationCode } = body;
    await this.authService.checkEmailVerificationCode(email, verificationCode);

    return {
      statusCode: 200,
    };
  }
}
