import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * Follow entity that maps to the 'follows' table in the database
 */
@Entity({ schema: 'capacitor', name: 'follows' })
export class Follow {
  /**
   * ID of the user who is following someone
   */
  @PrimaryColumn({ name: 'following_user_id' })
  followingUserId: string;

  /**
   * ID of the user who is being followed
   */
  @PrimaryColumn({ name: 'followed_user_id' })
  followedUserId: string;

  /**
   * User who is following
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'following_user_id' })
  followingUser: User;

  /**
   * User who is being followed
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'followed_user_id' })
  followedUser: User;
}
