import sharp from 'sharp';

import ThumbnailRepository from '../repositories/thumbnailRepository';

const THUMBNAIL_SIZES = Object.freeze({
  big: { width: 400, height: 300 },
  medium: { width: 160, height: 120 },
  small: { width: 120, height: 120 },
});

const buildThumbnails = async (file) => {
  const { buffer } = file;
  const bigThumbnail = await sharp(buffer).resize(THUMBNAIL_SIZES.big).png().toBuffer();
  const mediumThumbnail = await sharp(buffer).resize(THUMBNAIL_SIZES.medium).png().toBuffer()
  const smallThumbnail = await sharp(buffer).resize(THUMBNAIL_SIZES.small).png().toBuffer();

  const thumbnails = {
    big: bigThumbnail,
    medium: mediumThumbnail,
    small: smallThumbnail,
  };

  return saveImageThumbnails(thumbnails);
};

const saveImageThumbnails = (thumbnails) => {
  const name = getThumbnailsCollectionName();
  ThumbnailRepository.store(name, thumbnails);
  return {
    big: `${name}_big`,
    medium: `${name}_medium`,
    small: `${name}_small`,
  };
}

const getThumbnailsCollectionName = () => `thumbnail${Date.now()}`;

const getThumbnailDataByName = (name) => {
  const nameData = name.split('_');
  const collectionName = nameData[0];
  const collectionType = nameData[1];
  const thumbnailData = ThumbnailRepository.getByName(collectionName);
  if (thumbnailData) {
    return thumbnailData.thumbnails[collectionType];
  }
  return null;
}

export { buildThumbnails, saveImageThumbnails, getThumbnailDataByName };