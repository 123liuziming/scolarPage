/**
 * This file contains commonly used front end functions.
 */

function __PRIVATE_md51(s) {
  txt = "";
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, __PRIVATE_md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++)
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

function __PRIVATE_md5blk(s) {
  var md5blks = [],
    i;
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] =
      s.charCodeAt(i) +
      (s.charCodeAt(i + 1) << 8) +
      (s.charCodeAt(i + 2) << 16) +
      (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

var hex_chr = "0123456789abcdef".split("");

function __PRIVATE_rhex(n) {
  var s = "",
    j = 0;
  for (; j < 4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
  return s;
}

function __PRIVATE_hex(x) {
  for (var i = 0; i < x.length; i++) x[i] = __PRIVATE_rhex(x[i]);
  return x.join("");
}

function __PRIVATE_md5(s) {
  return __PRIVATE_hex(__PRIVATE_md51(s));
}

/**
 * @param {{name: String, avatar?: String}} obj
 * @returns {string} The URL pointing to the avatar image.
 */
function avatarOf(obj) {
  if (obj.avatar) return obj.avatar;
  return `https://www.gravatar.com/avatar/${__PRIVATE_md5(obj.name) ||
    ""}?d=retro`;
}

export { avatarOf };
