// @ts-check

/**
 * This file contains commonly used front end functions.
 */

function __P_md5cycle(x, k) {
  var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];

  a = __P_ff(a, b, c, d, k[0], 7, -680876936);
  d = __P_ff(d, a, b, c, k[1], 12, -389564586);
  c = __P_ff(c, d, a, b, k[2], 17, 606105819);
  b = __P_ff(b, c, d, a, k[3], 22, -1044525330);
  a = __P_ff(a, b, c, d, k[4], 7, -176418897);
  d = __P_ff(d, a, b, c, k[5], 12, 1200080426);
  c = __P_ff(c, d, a, b, k[6], 17, -1473231341);
  b = __P_ff(b, c, d, a, k[7], 22, -45705983);
  a = __P_ff(a, b, c, d, k[8], 7, 1770035416);
  d = __P_ff(d, a, b, c, k[9], 12, -1958414417);
  c = __P_ff(c, d, a, b, k[10], 17, -42063);
  b = __P_ff(b, c, d, a, k[11], 22, -1990404162);
  a = __P_ff(a, b, c, d, k[12], 7, 1804603682);
  d = __P_ff(d, a, b, c, k[13], 12, -40341101);
  c = __P_ff(c, d, a, b, k[14], 17, -1502002290);
  b = __P_ff(b, c, d, a, k[15], 22, 1236535329);

  a = __P_gg(a, b, c, d, k[1], 5, -165796510);
  d = __P_gg(d, a, b, c, k[6], 9, -1069501632);
  c = __P_gg(c, d, a, b, k[11], 14, 643717713);
  b = __P_gg(b, c, d, a, k[0], 20, -373897302);
  a = __P_gg(a, b, c, d, k[5], 5, -701558691);
  d = __P_gg(d, a, b, c, k[10], 9, 38016083);
  c = __P_gg(c, d, a, b, k[15], 14, -660478335);
  b = __P_gg(b, c, d, a, k[4], 20, -405537848);
  a = __P_gg(a, b, c, d, k[9], 5, 568446438);
  d = __P_gg(d, a, b, c, k[14], 9, -1019803690);
  c = __P_gg(c, d, a, b, k[3], 14, -187363961);
  b = __P_gg(b, c, d, a, k[8], 20, 1163531501);
  a = __P_gg(a, b, c, d, k[13], 5, -1444681467);
  d = __P_gg(d, a, b, c, k[2], 9, -51403784);
  c = __P_gg(c, d, a, b, k[7], 14, 1735328473);
  b = __P_gg(b, c, d, a, k[12], 20, -1926607734);

  a = __P_hh(a, b, c, d, k[5], 4, -378558);
  d = __P_hh(d, a, b, c, k[8], 11, -2022574463);
  c = __P_hh(c, d, a, b, k[11], 16, 1839030562);
  b = __P_hh(b, c, d, a, k[14], 23, -35309556);
  a = __P_hh(a, b, c, d, k[1], 4, -1530992060);
  d = __P_hh(d, a, b, c, k[4], 11, 1272893353);
  c = __P_hh(c, d, a, b, k[7], 16, -155497632);
  b = __P_hh(b, c, d, a, k[10], 23, -1094730640);
  a = __P_hh(a, b, c, d, k[13], 4, 681279174);
  d = __P_hh(d, a, b, c, k[0], 11, -358537222);
  c = __P_hh(c, d, a, b, k[3], 16, -722521979);
  b = __P_hh(b, c, d, a, k[6], 23, 76029189);
  a = __P_hh(a, b, c, d, k[9], 4, -640364487);
  d = __P_hh(d, a, b, c, k[12], 11, -421815835);
  c = __P_hh(c, d, a, b, k[15], 16, 530742520);
  b = __P_hh(b, c, d, a, k[2], 23, -995338651);

  a = __P_ii(a, b, c, d, k[0], 6, -198630844);
  d = __P_ii(d, a, b, c, k[7], 10, 1126891415);
  c = __P_ii(c, d, a, b, k[14], 15, -1416354905);
  b = __P_ii(b, c, d, a, k[5], 21, -57434055);
  a = __P_ii(a, b, c, d, k[12], 6, 1700485571);
  d = __P_ii(d, a, b, c, k[3], 10, -1894986606);
  c = __P_ii(c, d, a, b, k[10], 15, -1051523);
  b = __P_ii(b, c, d, a, k[1], 21, -2054922799);
  a = __P_ii(a, b, c, d, k[8], 6, 1873313359);
  d = __P_ii(d, a, b, c, k[15], 10, -30611744);
  c = __P_ii(c, d, a, b, k[6], 15, -1560198380);
  b = __P_ii(b, c, d, a, k[13], 21, 1309151649);
  a = __P_ii(a, b, c, d, k[4], 6, -145523070);
  d = __P_ii(d, a, b, c, k[11], 10, -1120210379);
  c = __P_ii(c, d, a, b, k[2], 15, 718787259);
  b = __P_ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = __P_add32(a, x[0]);
  x[1] = __P_add32(b, x[1]);
  x[2] = __P_add32(c, x[2]);
  x[3] = __P_add32(d, x[3]);
}

function __P_cmn(q, a, b, x, s, t) {
  a = __P_add32(__P_add32(a, q), __P_add32(x, t));
  return __P_add32((a << s) | (a >>> (32 - s)), b);
}

function __P_ff(a, b, c, d, x, s, t) {
  return __P_cmn((b & c) | (~b & d), a, b, x, s, t);
}

function __P_gg(a, b, c, d, x, s, t) {
  return __P_cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function __P_hh(a, b, c, d, x, s, t) {
  return __P_cmn(b ^ c ^ d, a, b, x, s, t);
}

function __P_ii(a, b, c, d, x, s, t) {
  return __P_cmn(c ^ (b | ~d), a, b, x, s, t);
}

function __P_add32(a, b) {
  return (a + b) & 0xffffffff;
}

function __P_md51(s) {
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    __P_md5cycle(state, __P_md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++)
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    __P_md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  __P_md5cycle(state, tail);
  return state;
}

function __P_md5blk(s) {
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

const __P_hex_chr = "0123456789abcdef".split("");

function __P_rhex(n) {
  var s = "",
    j = 0;
  for (; j < 4; j++)
    s +=
      __P_hex_chr[(n >> (j * 8 + 4)) & 0x0f] +
      __P_hex_chr[(n >> (j * 8)) & 0x0f];
  return s;
}

function __P_hex(x) {
  for (var i = 0; i < x.length; i++) x[i] = __P_rhex(x[i]);
  return x.join("");
}

function __P_md5(s) {
  return __P_hex(__P_md51(s));
}

/**
 * @param {{name: String, avatar?: String}} obj
 * @returns {string} The URL pointing to the avatar image.
 */
function avatarOf(obj) {
  if (obj.avatar) return obj.avatar;
  return `https://www.gravatar.com/avatar/${__P_md5(obj.name) || ""}?d=retro`;
}

export { avatarOf };
