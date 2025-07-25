import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for creating a new user
 */
export class CreateUserDto {
  /**
   * User's email address - must be unique in the system
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password - will be hashed before storage
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  /**
   * User's display name in the application
   */
  @IsString()
  @IsNotEmpty()
  displayName: string;

  /**
   * Optional user biography
   */
  @IsString()
  bio?: string;
}
