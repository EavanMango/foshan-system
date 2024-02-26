/**
 *  Aes加密解密
 * 此方法使用AES-128-ECB加密模式，key需要为16位
 * 加密解密key必须相同，如：abcd1234abcd1234
 */
import CryptoJS from 'crypto-js'
// const CryptoJS = window.CryptoJS
export class AesUtil {
    /** 加密密钥 */
    static key = CryptoJS.enc.Utf8.parse('*&s@md^^es?cxa2w')
    /** 加密偏移量 */
    static iv = CryptoJS.enc.Utf8.parse('mm%td==xxk+l?lx2')

    /**
     * 加密
     *
     * @param text       加密字段
     * @param key       密钥
     */
    static encrypt(text, key = AesUtil.key) {
        if (!text) {
            return ''
        }
        const words = JSON.stringify({
            time: new Date().getTime(),
            value: text
        })
        const encrypted = CryptoJS.AES.encrypt(words, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            iv: AesUtil.iv
        })
        return encrypted.toString()
    }

    /**
     * 解密
     *
     * @param text      加密字段
     * @param key       密钥
     */
    static decrypt(text, key = AesUtil.key) {
        if (!text) {
            return ''
        }
        const decrypt = CryptoJS.AES.decrypt(text, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
            iv: AesUtil.iv
        })
        const decodeStr = CryptoJS.enc.Utf8.stringify(decrypt)
        const result = JSON.parse(decodeStr)
        return result?.value
    }

    /**
     * 加密密码
     *
     * @param text       加密字段
     * @param key       密钥
     */
    static encryptPassword(text, key = AesUtil.key) {
        if (!text) {
            return ''
        }
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: AesUtil.iv
        })
        return encrypted.toString()
    }
    /**
     * 解密密码
     *
     * @param text      加密字段
     * @param key       密钥
     */
    static decryptPassword(text, key = AesUtil.key) {
        if (!text) {
            return ''
        }
        const decrypt = CryptoJS.AES.decrypt(text, key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: AesUtil.iv
        })
        const decodeStr = CryptoJS.enc.Utf8.stringify(decrypt)
        return decodeStr
    }
}
