import Thumbnail from '../domain/thumbnail';

class ThumbnailRepository {
  constructor() {
    this.thumbnails = [];
  }

  store(name, thumbnails) {
    this.thumbnails.push(new Thumbnail(name, thumbnails));
  }

  getByName(name) {
    return this.thumbnails.find(element => element.name === name);
  }

  clear() {
    this.thumbnails = [];
  }
}

export default new ThumbnailRepository();
