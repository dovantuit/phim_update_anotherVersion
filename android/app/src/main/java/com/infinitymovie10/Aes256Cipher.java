package com.infinitymovie10;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.spec.AlgorithmParameterSpec;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class Aes256Cipher extends ReactContextBaseJavaModule {

    private static final byte[] ivBytes = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00 };

    public Aes256Cipher(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Aes256Cipher";
    }

    @ReactMethod
    public static String encryptBase64(String data, String key) {
        String encrypt = Base64.encodeBase64URLSafeString(Aes256Cipher.encrypt(data, key));
        return encrypt;
    }

    @ReactMethod
    public static String decryptBase64(String data, String key) {
        byte[] decrypt = Base64.decodeBase64(data);
        String value = decrypt(decrypt, key);
        return value;
    }

    @ReactMethod
    public static byte[] encrypt(String data, String key) {
        try {
            byte[] dataBytes = data.getBytes("UTF-8");
            byte[] keyBytes = key.getBytes("UTF-8");

            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(keyBytes, 0, key.length());
            byte[] keyBuyDes = m.digest();
            SecretKeySpec keyspec = new SecretKeySpec(
                    new BigInteger(1, keyBuyDes).toString(16).substring(0, 24).getBytes(), "DESede");

            Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, keyspec);
            return cipher.doFinal(dataBytes);
        } catch (Exception ex) {
            return null;
        }
    }

    @ReactMethod
    public static String decrypt(byte[] data, String key) {
        try {
            byte[] keyBytes = key.getBytes("UTF-8");

            MessageDigest m = MessageDigest.getInstance("MD5");
            m.update(keyBytes, 0, key.length());
            byte[] keyBuyDes = m.digest();
            SecretKeySpec keyspec = new SecretKeySpec(
                    new BigInteger(1, keyBuyDes).toString(16).substring(0, 24).getBytes(), "DESede");

            Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, keyspec);
            return new String(cipher.doFinal(data), "UTF-8");
        } catch (Exception ex) {
            return null;
        }
    }

    @ReactMethod
    private static Cipher getCipher(String key, int mode) throws Exception {
        AlgorithmParameterSpec ivSpec = new IvParameterSpec(ivBytes);
        SecretKeySpec newKey = new SecretKeySpec(key.getBytes("UTF-8"), "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(mode, newKey, ivSpec);

        return cipher;
    }
}
