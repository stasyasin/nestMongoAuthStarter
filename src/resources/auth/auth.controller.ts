import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ResetUserDto } from '../users/dto/reset-user.dto';
import { Public } from '../../shared/decorators/public.decorator';
import { IUser } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  @Public()
  @Post('register')
  async register(@Res() res, @Body() registerUserDto: RegisterUserDto) {
    try {
      const isUserEmailBusy = await this.usersService.findUserByEmail(registerUserDto.email);
      if (isUserEmailBusy) {
        return res.status(HttpStatus.FORBIDDEN).json({
          message: 'Email is already in use.'
        });
      }

      const registeredUser = await this.usersService.create(registerUserDto);
      return res.status(HttpStatus.OK).json({
        message: 'User has been created successfully',
        registeredUser,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Bad request provided!',
        status: 400,
      });
    }
  }

  // @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Res() res, @Body() loginUserDto: LoginUserDto) {
    try {
      const isUserEmailCorrect = await this.usersService.findUserByEmail(loginUserDto.email);
      if (!isUserEmailCorrect) {
        return res.status(HttpStatus.FORBIDDEN).json({
          message: 'Email or password is wrong.'
        });
      }
      const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
      if (!user) {
        return res.status(HttpStatus.FORBIDDEN).json({
          message: 'Email or password is wrong.'
        });
      }

      const access_token = await this.authService.login(user as IUser);
      return res.status(HttpStatus.OK).json({
        message: 'User has been logged successfully',
        access_token,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Bad request provided!',
        status: 400,
      });
    }
  }

  @Post('reset')
  async reset(@Res() res, @Body() resetUserDto: ResetUserDto) {
    // todo finish logic for reset password
    return res.status(HttpStatus.OK).json({
      message: 'Email with reset link was sent successfully',
      resetUserDto,
    });
  }

  @Post('logout')
  async logout(@Res() res, @Body() resetUserDto: ResetUserDto) {
    // todo rewoke token here
  }

}
