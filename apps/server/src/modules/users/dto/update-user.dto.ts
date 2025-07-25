import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * Data Transfer Object for updating an existing user
 */
export class UpdateUserDto {
  /**
   * User's email address
   */
  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * User's password
   */
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;

  /**
   * User's display name
   */
  @IsString()
  @IsOptional()
  displayName?: string;

  /**
   * User biography
   */
  @IsString()
  @IsOptional()
  bio?: string;
}
