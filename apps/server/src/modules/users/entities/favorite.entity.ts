import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Asset } from '../../assets/entities/asset.entity';

/**
 * Favorite entity that maps to the 'favorites' table in the database
 */
@Entity({ schema: 'capacitor', name: 'favorites' })
export class Favorite {
  /**
   * ID of the asset that is favorited
   */
  @PrimaryColumn({ name: 'favorited_asset_id' })
  favoritedAssetId: string;

  /**
   * ID of the user who favorited the asset
   */
  @PrimaryColumn({ name: 'favoriting_user_id' })
  favoritingUserId: string;

  /**
   * Asset that is favorited
   */
  @ManyToOne(() => Asset)
  @JoinColumn({ name: 'favorited_asset_id' })
  favoritedAsset: Asset;

  /**
   * User who favorited the asset
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'favoriting_user_id' })
  favoritingUser: User;
}
