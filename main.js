"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var https_proxy_agent_1 = require("https-proxy-agent");
var readline = require("readline");
var fs = require("fs");
var Checker = /** @class */ (function () {
    function Checker(wallets, proxies) {
        this.wallets = wallets;
        this.proxies = proxies;
        this.proxyNumber = 0;
    }
    Checker.prototype.sleep = function (sec) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(function () { return resolve(''); }, sec * 1000); })];
            });
        });
    };
    Checker.prototype.getProxy = function (proxy) {
        var _a = proxy.split(':'), ip = _a[0], port = _a[1], username = _a[2], password = _a[3];
        return new https_proxy_agent_1.HttpsProxyAgent("http://".concat(username, ":").concat(password, "@").concat(ip, ":").concat(port));
    };
    Checker.prototype.getBalance = function (wallet) {
        return __awaiter(this, void 0, void 0, function () {
            var proxy, response, balance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proxy = this.proxies[this.proxyNumber % this.wallets.length];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 8]);
                        return [4 /*yield*/, axios_1.default.get('https://api.debank.com/user/total_balance', {
                                params: {
                                    'addr': wallet
                                },
                                headers: {
                                    'authority': 'api.debank.com',
                                    'accept': '*/*',
                                    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                                    'cache-control': 'no-cache',
                                    'origin': 'https://debank.com',
                                    'pragma': 'no-cache',
                                    'referer': 'https://debank.com/',
                                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'empty',
                                    'sec-fetch-mode': 'cors',
                                    'sec-fetch-site': 'same-site',
                                    'source': 'web',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                                    'x-api-nonce': 'n_RT2KhwQF08JA3CwiTUOhUnel9ELZPGHDb2UgZLKh',
                                    'x-api-sign': 'd12289cb9d8323edd2584cd25c8d4647e06e921482ec1a7fa657dd864cc5b1f5',
                                    'x-api-ts': '1689197778',
                                    'x-api-ver': 'v2'
                                },
                                proxy: proxy ? false : undefined,
                                httpsAgent: proxy ? this.getProxy(proxy) : undefined
                            })];
                    case 2:
                        response = _a.sent();
                        balance = response.data.data.total_usd_value.toFixed(2);
                        if (balance)
                            return [2 /*return*/, Number(balance)];
                        return [4 /*yield*/, this.sleep(5)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getBalance(wallet)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        e_1 = _a.sent();
                        this.proxyNumber++;
                        if (e_1.response.data.includes('429'))
                            console.log('Too Many Requests');
                        return [4 /*yield*/, this.sleep(5)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.getBalance(wallet)];
                    case 7: return [2 /*return*/, _a.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return Checker;
}());
function read(fileName) {
    var _a, e_2, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var array, readInterface, _d, readInterface_1, readInterface_1_1, line, e_2_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    array = [];
                    readInterface = readline.createInterface({
                        input: fs.createReadStream(fileName),
                        crlfDelay: Infinity,
                    });
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _d = true, readInterface_1 = __asyncValues(readInterface);
                    _e.label = 2;
                case 2: return [4 /*yield*/, readInterface_1.next()];
                case 3:
                    if (!(readInterface_1_1 = _e.sent(), _a = readInterface_1_1.done, !_a)) return [3 /*break*/, 5];
                    _c = readInterface_1_1.value;
                    _d = false;
                    line = _c;
                    array.push(line);
                    _e.label = 4;
                case 4:
                    _d = true;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _e.trys.push([7, , 10, 11]);
                    if (!(!_d && !_a && (_b = readInterface_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _b.call(readInterface_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, array];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var wallets, proxies, dataStor, total, checker, _i, wallets_1, wallet, balance, _a, dataStor_1, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, read('wallets.txt')];
                case 1:
                    wallets = _b.sent();
                    return [4 /*yield*/, read('proxies.txt')];
                case 2:
                    proxies = _b.sent();
                    dataStor = [];
                    total = 0;
                    process.on('SIGINT', function () {
                        fs.writeFileSync('logs.txt', '');
                        dataStor.sort(function (a, b) { return b.balance - a.balance; });
                        for (var _i = 0, dataStor_2 = dataStor; _i < dataStor_2.length; _i++) {
                            var i = dataStor_2[_i];
                            fs.appendFileSync('logs.txt', "".concat(i.wallet, " ").concat(i.balance, "$\n"));
                        }
                        fs.appendFileSync('logs.txt', "Total$ ".concat(total, "$"));
                        process.exit(0);
                    });
                    fs.writeFileSync('logs.txt', '');
                    checker = new Checker(wallets, proxies);
                    _i = 0, wallets_1 = wallets;
                    _b.label = 3;
                case 3:
                    if (!(_i < wallets_1.length)) return [3 /*break*/, 6];
                    wallet = wallets_1[_i];
                    return [4 /*yield*/, checker.getBalance(wallet)];
                case 4:
                    balance = _b.sent();
                    console.log("".concat(wallet, " ").concat(balance, "$"));
                    total += balance;
                    dataStor.push({ wallet: wallet, balance: balance });
                    fs.appendFileSync('logs.txt', "".concat(wallet, " ").concat(balance, "$\n"));
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    fs.writeFileSync('logs.txt', '');
                    dataStor.sort(function (a, b) { return b.balance - a.balance; });
                    for (_a = 0, dataStor_1 = dataStor; _a < dataStor_1.length; _a++) {
                        i = dataStor_1[_a];
                        fs.appendFileSync('logs.txt', "".concat(i.wallet, " ").concat(i.balance, "$\n"));
                    }
                    fs.appendFileSync('logs.txt', "Total$ ".concat(total, "$"));
                    return [2 /*return*/];
            }
        });
    });
}
main();
