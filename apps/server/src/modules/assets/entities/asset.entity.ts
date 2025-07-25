import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Asset entity that maps to the 'assets' table in the database
 */
@Entity({ schema: 'capacitor', name: 'assets' })
export class Asset {
  /**
   * Asset's unique identifier
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Asset's author identifier
   */
  @Column({ name: 'author_id' })
  authorId: string;

  /**
   * Asset's publication status
   */
  @Column({
    type: 'enum',
    enum: ['draft', 'awaiting_moderation', 'denied', 'published'],
    default: 'draft'
  })
  status: 'draft' | 'awaiting_moderation' | 'denied' | 'published';

  /**
   * Asset's version number
   */
  @Column({ default: 1 })
  version: number;

  /**
   * Parent asset identifier
   */
  @Column({ nullable: true })
  parent?: string;

  /**
   * Asset's title
   */
  @Column()
  title: string;

  /**
   * Asset's description
   */
  @Column({ type: 'text', nullable: true })
  description?: string;

  /**
   * Asset's type
   */
  @Column({
    name: 'asset_type',
    type: 'enum',
    enum: ['layout', 'passive_widget', 'active_widget']
  })
  assetType: 'layout' | 'passive_widget' | 'active_widget';

  /**
   * URL for downloading the asset
   */
  @Column({ name: 'download_url' })
  downloadUrl: string;

  /**
   * Number of slots the asset has
   */
  @Column({ default: 0 })
  slots: number;

  /**
   * Author of the asset
   */
  @ManyToOne(() => User, (user) => user.assets)
  @JoinColumn({ name: 'author_id' })
  author: User;
}
