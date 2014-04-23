/*
 * grunt-gumup
 * https://github.com/amsemy/grunt-gumup
 *
 * Copyright (c) 2014 Amsemy
 * Licensed under the MIT license.
 */

'use strict';

var Namespace = function(sourceCache) {
    this._sourceCache = sourceCache;
    this._sources = [];
};

Namespace.prototype.add = function(srcFile) {
    // src.units
    // src.dependencies
    // src.file

    var src = this._sourceCache.parse(srcFile);
    for (var i = 0, len = src.length; i < len; i++) {
        this._sources.push(src);
    }
};

Namespace.prototype.resolve = function() {
    var stack = this._sources.slice();
    var srcFiles = [];


    while (true) {

        // TODO: without recursion

    }
};

function resolve(source, resolved) {

/*
Units:
a
b: a
c: a, d
d
e: b, c
f: c, d
g: e, f
h: b, e

Expect: abdcehfg
 */

/*
Two passes:

1st (build references):
 . -> HG
 h -> BEG
 b -> AEG
 a -> EG
 e -> CG
 c -> DG
 d -> G
 g -> F
 f -> .

2nd (resolve):
 . -> AD
 a -> DBC
 d -> BCF
 b -> CFEH
 c -> FEH
 f -> EHG
 e -> HG
 h -> G
 g -> .

Actual: adbcfehg
*/

/*
One pass:
 . -> GH
 g -> HFE
 h -> FEB
 f -> EBDC
 e -> BDC
 b -> DCA
 d -> CA
 c -> A
 a -> .

Actual: acd#ERR!
 */

/*
One pass with backward navigation:
 . -> st: *HG, bk: ., pr: ., out: .
 h -> st: *BEG, bk: H, pr: H, out: .
 b -> st: *AEG, bk: HB, pr: HB, out: .
 a -> st: EG, bk: HB*, pr: HBA, out: a
-b -> st: EG, bk: H*, pr: HBA, out: ab
-h -> st: *EG, bk: H, pr: HBA, out: ab
 e -> st: *CG, bk: HE, pr: HBAE, out: ab
 c -> st: *DG, bk: HEC, pr: HBAEC, out: ab
 d -> st: G, bk: HEC*, pr: HBAECD, out: abd
-c -> st: G, bk: HE*, pr: HBAECD, out: abdc
-e -> st: G, bk: H*, pr: HBAECD, out: abdce
-h -> st: G, bk: .*, pr: HBAECD, out: abdceh
 . -> st: *G, bk: ., pr: HBAECD, out: abdceh
 g -> st: *F, bk: G, pr: HBAECDG, out: abdceh
 f -> st: ., bk: G*, pr: HBAECDGF, out: abdcehf
-g -> st: ., bk: .*, pr: HBAECDGF, out: abdcehfg

Actual: abdcehfg
 */

}

var tasks = ['foo', 'bar'];
while(true) {

    if (!tasks.length) {
        return;
    }

    var current = tasks.shift();
    tasks.pop(current.dependencies);

}



module.exports = Namespace;
