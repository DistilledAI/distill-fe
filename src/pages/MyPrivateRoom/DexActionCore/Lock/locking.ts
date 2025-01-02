/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vault.json`.
 */
export type Vault = {
  address: "9grg8RG2prncny136yjDMy5BZcwhB4NvqGMGDFs7QtKy"
  metadata: {
    name: "vault"
    version: "0.1.0"
    spec: "0.1.0"
    description: "Created with Anchor"
  }
  instructions: [
    {
      name: "createVault"
      discriminator: [29, 237, 247, 208, 193, 82, 54, 135]
      accounts: [
        {
          name: "authority"
          writable: true
          signer: true
        },
        {
          name: "stakeConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
          }
        },
        {
          name: "stakeCurrencyMint"
        },
        {
          name: "vault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ]
              },
              {
                kind: "account"
                path: "stakeConfig"
              },
              {
                kind: "arg"
                path: "lockPeriod"
              },
            ]
          }
        },
        {
          name: "vaultTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "lockPeriod"
          type: "u64"
        },
      ]
    },
    {
      name: "destake"
      discriminator: [70, 3, 73, 97, 22, 50, 116, 1]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "stakeConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
          }
        },
        {
          name: "vault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ]
              },
              {
                kind: "account"
                path: "stakeConfig"
              },
              {
                kind: "arg"
                path: "lockPeriod"
              },
            ]
          }
        },
        {
          name: "vaultTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "stakerInfoPda"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "stakeDetailPda"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [115, 116, 97, 107, 101, 95, 100, 101, 116, 97, 105, 108]
              },
              {
                kind: "account"
                path: "stakerInfoPda"
              },
              {
                kind: "arg"
                path: "id"
              },
            ]
          }
        },
        {
          name: "stakerTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "signer"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "stakeCurrencyMint"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
      ]
      args: [
        {
          name: "id"
          type: "u64"
        },
        {
          name: "lockPeriod"
          type: "u64"
        },
        {
          name: "amount"
          type: "u64"
        },
      ]
    },
    {
      name: "initialize"
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "stakeConfig"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
          }
        },
        {
          name: "stakeCurrencyMint"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
      ]
      args: []
    },
    {
      name: "stake"
      discriminator: [206, 176, 202, 18, 200, 209, 179, 108]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "stakeConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
          }
        },
        {
          name: "vault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  105,
                  110,
                  103,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116,
                ]
              },
              {
                kind: "account"
                path: "stakeConfig"
              },
              {
                kind: "arg"
                path: "lockPeriod"
              },
            ]
          }
        },
        {
          name: "vaultTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "stakerInfoPda"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [115, 116, 97, 107, 101, 114, 95, 105, 110, 102, 111]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "stakeDetailPda"
          writable: true
        },
        {
          name: "stakerTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "signer"
              },
              {
                kind: "const"
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: "account"
                path: "stakeCurrencyMint"
              },
            ]
            program: {
              kind: "const"
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: "stakeCurrencyMint"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "lockPeriod"
          type: "u64"
        },
        {
          name: "amount"
          type: "u64"
        },
      ]
    },
  ]
  accounts: [
    {
      name: "stakeConfig"
      discriminator: [238, 151, 43, 3, 11, 151, 63, 176]
    },
    {
      name: "stakeDetail"
      discriminator: [50, 187, 176, 236, 173, 1, 166, 111]
    },
    {
      name: "stakerInfo"
      discriminator: [241, 238, 149, 141, 241, 59, 35, 107]
    },
    {
      name: "vault"
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119]
    },
  ]
  events: [
    {
      name: "eventNewVault"
      discriminator: [62, 85, 178, 155, 210, 80, 16, 125]
    },
    {
      name: "eventStake"
      discriminator: [193, 220, 225, 33, 201, 27, 61, 43]
    },
    {
      name: "eventUnstake"
      discriminator: [7, 14, 248, 129, 43, 55, 41, 104]
    },
  ]
  errors: [
    {
      code: 6000
      name: "isStaked"
      msg: "Tokens are already staked"
    },
    {
      code: 6001
      name: "notStaked"
      msg: "Tokens not staked"
    },
    {
      code: 6002
      name: "noTokens"
      msg: "No Tokens to stake"
    },
    {
      code: 6003
      name: "vaultEnded"
      msg: "Vault has been ended"
    },
    {
      code: 6004
      name: "vaultNotStarted"
      msg: "Vault not started"
    },
    {
      code: 6005
      name: "unbondingTimeNotOverYet"
      msg: "The unbonding time is not over yet"
    },
    {
      code: 6006
      name: "tgeNotYetReached"
      msg: "Soft cap reached, but need to wait til TGE. Cannot unstake!"
    },
    {
      code: 6007
      name: "overflowError"
      msg: "overflow"
    },
    {
      code: 6008
      name: "alreadyClaimed"
      msg: "Already claimed"
    },
    {
      code: 6009
      name: "incorrectAuthority"
      msg: "incorrectAuthority"
    },
    {
      code: 6010
      name: "incorrectStakeDetailId"
      msg: "Incorrect Stake detail ID. It must be current stake info id"
    },
    {
      code: 6011
      name: "incorrectLockPeriod"
      msg: "Incorrect Lock Period"
    },
  ]
  types: [
    {
      name: "eventNewVault"
      type: {
        kind: "struct"
        fields: [
          {
            name: "vault"
            type: "pubkey"
          },
          {
            name: "stakeConfig"
            type: "pubkey"
          },
          {
            name: "stakeCurrencyMint"
            type: "pubkey"
          },
          {
            name: "lockPeriod"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "eventStake"
      type: {
        kind: "struct"
        fields: [
          {
            name: "stakeConfigPub"
            type: "pubkey"
          },
          {
            name: "stakeConfig"
            type: {
              defined: {
                name: "stakeConfig"
              }
            }
          },
          {
            name: "stakerInfoPub"
            type: "pubkey"
          },
          {
            name: "stakerInfo"
            type: {
              defined: {
                name: "stakerInfo"
              }
            }
          },
          {
            name: "stakeDetailPub"
            type: "pubkey"
          },
          {
            name: "stakeDetail"
            type: {
              defined: {
                name: "stakeDetail"
              }
            }
          },
          {
            name: "vaultPub"
            type: "pubkey"
          },
          {
            name: "vault"
            type: {
              defined: {
                name: "vault"
              }
            }
          },
          {
            name: "stakeCurrencyMint"
            type: "pubkey"
          },
          {
            name: "vaultStakingTokenAccount"
            type: "pubkey"
          },
          {
            name: "stakerTokenAccount"
            type: "pubkey"
          },
          {
            name: "amount"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "eventUnstake"
      type: {
        kind: "struct"
        fields: [
          {
            name: "stakeConfigPub"
            type: "pubkey"
          },
          {
            name: "stakeConfig"
            type: {
              defined: {
                name: "stakeConfig"
              }
            }
          },
          {
            name: "stakerInfoPub"
            type: "pubkey"
          },
          {
            name: "stakerInfo"
            type: {
              defined: {
                name: "stakerInfo"
              }
            }
          },
          {
            name: "stakeDetailPub"
            type: "pubkey"
          },
          {
            name: "stakeDetail"
            type: {
              defined: {
                name: "stakeDetail"
              }
            }
          },
          {
            name: "vaultPub"
            type: "pubkey"
          },
          {
            name: "vault"
            type: {
              defined: {
                name: "vault"
              }
            }
          },
          {
            name: "stakeCurrencyMint"
            type: "pubkey"
          },
          {
            name: "vaultStakingTokenAccount"
            type: "pubkey"
          },
          {
            name: "stakerTokenAccount"
            type: "pubkey"
          },
          {
            name: "amount"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "stakeConfig"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            docs: ["Bump seed used to generate the program address / authority"]
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "version"
            type: "u8"
          },
          {
            name: "authority"
            docs: ["Owner of the configuration"]
            type: "pubkey"
          },
          {
            name: "stakeCurrencyMint"
            docs: ["currency mint of token to stake"]
            type: "pubkey"
          },
        ]
      }
    },
    {
      name: "stakeDetail"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            docs: ["Bump seed used to generate the program address / authority"]
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "id"
            type: "u64"
          },
          {
            name: "stakeAmount"
            type: "u64"
          },
          {
            name: "unstakedAtTime"
            type: "i64"
          },
          {
            name: "staker"
            type: "pubkey"
          },
        ]
      }
    },
    {
      name: "stakerInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            docs: ["Bump seed used to generate the program address / authority"]
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "totalStake"
            type: "u64"
          },
          {
            name: "currentId"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "vault"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            docs: ["Bump seed used to generate the program address / authority"]
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "version"
            type: "u8"
          },
          {
            name: "vaultConfig"
            type: "pubkey"
          },
          {
            name: "totalStaked"
            docs: ["total staked"]
            type: "u64"
          },
          {
            name: "lockPeriod"
            type: "u64"
          },
        ]
      }
    },
  ]
}
