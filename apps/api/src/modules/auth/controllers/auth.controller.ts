import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "@app/modules/auth/services/auth.service";
import {
  AuthenticationResponse,
  RequestCodeRequest,
  RequestCodeRequestSchema,
  VerifyCodeRequest,
  VerifyCodeRequestSchema,
} from "@pipu/api";
import { Public } from "@app/modules/auth/decorators/public.decorator";
import { ZodValidationPipe } from "@app/common/pipes/zod-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post("request-code")
  async requestCode(
    @Body(new ZodValidationPipe(RequestCodeRequestSchema))
    input: RequestCodeRequest,
  ): Promise<void> {
    return this._authService.requestCode(input.email);
  }

  @Public()
  @Post("verify-code")
  async verifyCode(
    @Body(new ZodValidationPipe(VerifyCodeRequestSchema))
    input: VerifyCodeRequest,
  ): Promise<AuthenticationResponse> {
    return await this._authService.verifyCode(input.email, input.code);
  }
}
