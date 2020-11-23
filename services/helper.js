const config = require('config');
const crypto = require('crypto');

exports.getCurrentDate = function () {
  const dt = new Date();
  dt.setHours(dt.getHours() + 3);
  return dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + dt.getDate()).slice(-2)
    + " " + ("0" + dt.getHours()).slice(-2) + ":" + ("0" + dt.getMinutes()).slice(-2) + ":" + ("0" + dt.getSeconds()).slice(-2);
};

exports.generateRandomString = function (length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let string = "";
  for (let i = 0; i < length; i++) {
    string += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return string;
};

exports.getRequestIP = function (req) {
  return req.headers["cf-connecting-ip"]
    || req.headers["x-real-ip"]
    || req.headers["x-client-ip"]
    || req.headers["x-forwarded-for"]
    || req.session.username
    || req.raw.ip;
};

exports.generateHash = function (password, salt) {
  let sha1 = crypto.createHash("sha1");
  sha1.update(password);
  let hash = sha1.digest("hex");
  sha1 = crypto.createHash("sha1");
  sha1.update(salt + hash);
  hash = sha1.digest("hex");
  sha1 = crypto.createHash("sha1");
  sha1.update(salt + hash);
  return sha1.digest("hex");
}

exports.getImageCache = function (image, width, height) {
  const fs = require('fs');
  let imageName = image.split('.');
  let ext = imageName[imageName.length-1];
  imageName = imageName.slice(0, -1).join('.');
  if (fs.existsSync('../www/viptime.tj/image/cache/' + imageName + '-' + width + 'x' + height + '.' + ext)) {
    return config.common.siteUrl + '/' + config.common.imagePath + '/cache/' + imageName + '-' + width + 'x' + height + '.' + ext;
  }

  const request = require('sync-request');

  const salt1 = "38DNx4gddNhmpX0z8BrT1pucZvNo3dTuOnikrkawRY";
  const salt2 = "0cqXr9eSkv0khkWhCztpjJGgxm93CKhdROkS72KgxE";

  let signature = crypto.createHash('md5').update(salt1 + crypto.createHash('md5').update(salt2 + [image, width, height].join('^')).digest('hex')).digest('hex');
  let result = request('GET', 'https://kitobz.com/index.php?route=tool/image&i=' + encodeURIComponent(image) + '&w=' + width + '&h=' + height + '&s=' + signature).getBody('utf8');

  if (result) {
    let image = JSON.parse(result);

    return image.image !== undefined ? image.image : '';
  }

  return '';
}
