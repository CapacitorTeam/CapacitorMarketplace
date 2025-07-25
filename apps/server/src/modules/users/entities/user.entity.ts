import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asset } from '../../assets/entities/asset.entity';

/**
 * User entity that maps to the 'users' table in the database
 */
@Entity({ schema: 'capacitor', name: 'users' })
export class User {
  /**
   * User's unique identifier
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * User's email address - must be unique
   */
  @Column({ unique: true })
  email: string;

  /**
   * User's hashed password
   */
  @Column()
  passwordHash: string;

  /**
   * User's display name
   */
  @Column()
  displayName: string;

  /**
   * User's role in the system
   */
  @Column({ type: 'enum', enum: ['member', 'moderator', 'admin'], default: 'member' })
  role: 'member' | 'moderator' | 'admin';

  /**
   * User's biography
   */
  @Column({ nullable: true, type: 'text' })
  bio?: string;

  /**
   * Timestamp when the user was created
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /**
   * Timestamp when the user validated their email
   */
  @Column({ name: 'validated_at', nullable: true })
  validatedAt?: Date;

  /**
   * Timestamp when the user was banned
   */
  @Column({ name: 'banned_at', nullable: true })
  bannedAt?: Date;

  /**
   * Assets created by this user
   */
  @OneToMany(() => Asset, (asset) => asset.author)
  assets: Asset[];
}
