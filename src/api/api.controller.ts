import { Controller, Get } from '@nestjs/common';

@Controller({ host: 'api.localhost' }) //하위 도메인 요청 처리 설정
export class ApiController {
  @Get() //같은 루트 경로
  index(): string {
    return 'Hello, API'; //다른 응답
  }
}
