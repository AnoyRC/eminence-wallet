'use client';

import {
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
} from '@solana/web3.js';
import * as bip39 from 'bip39';
import { MyWallet as Wallet } from './MyWallet';
import { useSelector } from 'react-redux';
import IDL from './idl.json';
import { AnchorProvider, BN, Program, utils } from '@project-serum/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import useToast from './useToast';
import useTransaction from './useTransaction';

export default function useVoucher() {
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const cluster = useSelector((state) => state.profile.connection);
  const { Success, Error } = useToast();
  const { createVoucherTransaction } = useTransaction();

  const createVoucherWeb3 = async (amount, uid, passphrase) => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      const wallet = new Wallet(keypair);
      const connection = new Connection(cluster, 'confirmed');

      const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed',
      });

      const program = new Program(
        IDL,
        'AFDNGbaMr2SqHKZnhXSTkbVB2d6npfxQdFFthrzsD7KN',
        provider
      );

      const [voucherPda] = findProgramAddressSync(
        [
          utils.bytes.utf8.encode('EMINENCE_VOUCHER'),
          utils.bytes.utf8.encode(uid),
          utils.bytes.utf8.encode(passphrase),
        ],
        program.programId
      );

      const amountBN = new BN(amount * LAMPORTS_PER_SOL);

      const tx = await program.methods
        .generateVoucher(uid, passphrase, amountBN)
        .accounts({
          authority: keypair.publicKey,
          voucher: voucherPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      Success(
        'Voucher Initialized with TxId: ' +
          tx.toString().substring(0, 4) +
          '...' +
          tx
            .toString()
            .substring(tx.toString().length - 4, tx.toString().length)
      );

      createVoucherTransaction(tx, amount, keypair.publicKey.toString(), 'SOL');

      return true;
    } catch (err) {
      console.log(err);
      Error('Something went wrong');
      return false;
    }
  };

  const redeemVoucherWeb3 = async (uid, passphrase, amount) => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      const wallet = new Wallet(keypair);
      const connection = new Connection(cluster, 'confirmed');

      const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed',
      });

      const program = new Program(
        IDL,
        'AFDNGbaMr2SqHKZnhXSTkbVB2d6npfxQdFFthrzsD7KN',
        provider
      );

      const [voucherPda] = findProgramAddressSync(
        [
          utils.bytes.utf8.encode('EMINENCE_VOUCHER'),
          utils.bytes.utf8.encode(uid),
          utils.bytes.utf8.encode(passphrase),
        ],
        program.programId
      );

      const tx = await program.methods
        .redeemVoucher(uid, passphrase)
        .accounts({
          authority: keypair.publicKey,
          voucher: voucherPda,
        })
        .rpc();

      await createVoucherTransaction(
        tx,
        amount,
        keypair.publicKey.toString(),
        'SOL'
      );

      Success('Voucher Redeemed');
      return true;
    } catch (err) {
      console.log(err);
      Error('Something went wrong');
      return false;
    }
  };

  return {
    createVoucherWeb3,
    redeemVoucherWeb3,
  };
}
