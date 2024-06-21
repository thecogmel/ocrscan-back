import { User } from 'src/users/entities/user.entity';

interface LoginRequest {
  user: User;
}

interface JwtPayload {
  sub: string;
  email: string;
}
