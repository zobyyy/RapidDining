import 'dotenv/config';

/**
 * @param {string} pictureInDB
 * @returns {string}
 * */
export function pictureForFrontend(pictureInDB) {
  return pictureInDB ? `https://${process.env.dbAddr}/pic/${pictureInDB}` : null;
}
