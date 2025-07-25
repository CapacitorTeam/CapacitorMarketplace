/**
 * Data Transfer Object for asset responses
 */
export class AssetResponseDto {
  /**
   * Asset's unique identifier
   */
  id: string;

  /**
   * Asset's author identifier
   */
  authorId: string;

  /**
   * Asset's publication status
   */
  status: string;

  /**
   * Asset's version number
   */
  version: number;

  /**
   * Parent asset identifier
   */
  parent?: string;

  /**
   * Asset's title
   */
  title: string;

  /**
   * Asset's description
   */
  description?: string;

  /**
   * Asset's type
   */
  assetType: string;

  /**
   * URL for downloading the asset
   */
  downloadUrl: string;

  /**
   * Number of slots the asset has
   */
  slots: number;

  constructor(partial: Partial<AssetResponseDto>) {
    Object.assign(this, partial);
  }
}
