/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.servletss.democoin;

import java.math.BigInteger;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.ContractGasProvider;

/**
 *
 * @author Admin
 */
public class Main {
    public static void main(String[] args) {
        try {
            Web3j web3 = Web3j.build(new HttpService("HTTP://127.0.0.1:7545"));
            Credentials create = Credentials.create("f29c6894d505c99ec1b758cf5930568dde3efc06fbfffe3a63424ff30064a54d");
            RemoteCall<Coin> deploy = Coin.deploy(web3, create, new ContractGasProvider() {
                @Override
                public BigInteger getGasPrice(String arg0) {
                    return  BigInteger.valueOf(0);
                }
                
                @Override
                public BigInteger getGasPrice() {
                    return  BigInteger.valueOf(0);
                }
                
                @Override
                public BigInteger getGasLimit(String arg0) {
                    return  BigInteger.valueOf(1111111);
                }
                
                @Override
                public BigInteger getGasLimit() {
                    return  BigInteger.valueOf(1111111);
                }
            });
            
            Coin coinContract = deploy.sendAsync().get();
            System.out.println("add:"+coinContract.getContractAddress());
            
        } catch (InterruptedException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ExecutionException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
            
}
