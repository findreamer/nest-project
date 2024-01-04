import { SetMetadata } from '@nestjs/common';

// 定义一个角色
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
