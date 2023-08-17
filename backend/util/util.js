import 'dotenv/config';

/**
 * @param {string} pictureInDB
 * @returns {string}
 * */
export function pictureForFrontend(pictureInDB) {
  return pictureInDB ? `http://${process.env.dbAddr}/pic/${pictureInDB}` : null;
}
