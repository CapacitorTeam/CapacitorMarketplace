import { Exclude, Expose, Type } from 'class-transformer';
import { AssetResponseDto } from '../../assets/dto/asset-response.dto';

/**
 * Data Transfer Object for user responses with different detail levels
 */
export class UserResponseDto {
  /**
   * User's unique identifier
   */
  id: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * User's display name
   */
  displayName: string;

  /**
   * User's role in the system
   */
  role: string;

  /**
   * User's biography
   */
  bio?: string;

  /**
   * User's creation timestamp
   */
  createdAt: Date;

  /**
   * User's validation timestamp
   */
  validatedAt?: Date;

  /**
   * Password hash - excluded from responses
   */
  @Exclude()
  passwordHash: string;

  /**
   * User's ban timestamp - excluded from responses
   */
  @Exclude()
  bannedAt?: Date;

  /**
   * Count of users who follow this user
   */
  @Expose({ groups: ['profile'] })
  followerCount?: number;

  /**
   * Count of users this user follows
   */
  @Expose({ groups: ['profile'] })
  followingCount?: number;

  /**
   * Assets created by this user
   */
  @Expose({ groups: ['profile'] })
  @Type(() => AssetResponseDto)
  assets?: AssetResponseDto[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
