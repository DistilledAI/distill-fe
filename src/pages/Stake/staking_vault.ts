/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/fung_staking_vault.json`.
 */
export type FungStakingVault = {
  address: "meshFKbt2UKjzdnmi64v98ZUkGzzh2ykWTmHRBw4X3i"
  metadata: {
    name: "fungStakingVault"
    version: "0.1.0"
    spec: "0.1.0"
    description: "Created with Anchor"
  }
  instructions: [
    {
      name: "claimDeStake"
      discriminator: [158, 190, 156, 65, 156, 169, 127, 86]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
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
                path: "stakeCurrencyMint"
              },
              {
                kind: "arg"
                path: "unbondingPeriod"
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
          name: "unbondingInfoPda"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  117,
                  110,
                  98,
                  111,
                  110,
                  100,
                  105,
                  110,
                  103,
                  95,
                  105,
                  110,
                  102,
                  111,
                  95,
                  115,
                  101,
                  101,
                  100,
                ]
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
          name: "unbondingPeriod"
          type: "u64"
        },
      ]
    },
    {
      name: "createVault"
      discriminator: [29, 237, 247, 208, 193, 82, 54, 135]
      accounts: [
        {
          name: "admin"
          writable: true
          signer: true
        },
        {
          name: "authority"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
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
                path: "stakeCurrencyMint"
              },
              {
                kind: "arg"
                path: "unbondingPeriod"
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
          name: "unbondingPeriod"
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
                path: "stakeCurrencyMint"
              },
              {
                kind: "arg"
                path: "unbondingPeriod"
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
          name: "unbondingInfoPda"
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
          name: "unbondingPeriod"
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
          name: "authority"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
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
                path: "stakeCurrencyMint"
              },
              {
                kind: "arg"
                path: "unbondingPeriod"
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
          name: "unbondingPeriod"
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
      name: "authority"
      discriminator: [36, 108, 254, 18, 167, 144, 27, 36]
    },
    {
      name: "stakerInfo"
      discriminator: [241, 238, 149, 141, 241, 59, 35, 107]
    },
    {
      name: "unbondingInfo"
      discriminator: [152, 114, 79, 94, 41, 193, 83, 220]
    },
    {
      name: "vault"
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119]
    },
  ]
  events: [
    {
      name: "eventClaimUnstake"
      discriminator: [99, 54, 74, 147, 119, 120, 100, 23]
    },
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
      name: "invalidAmount"
      msg: "Invalid amount"
    },
    {
      code: 6004
      name: "vaultEnded"
      msg: "Vault has been ended"
    },
    {
      code: 6005
      name: "vaultNotStarted"
      msg: "Vault not started"
    },
    {
      code: 6006
      name: "unbondingTimeNotOverYet"
      msg: "The unbonding time is not over yet"
    },
    {
      code: 6007
      name: "tgeNotYetReached"
      msg: "Soft cap reached, but need to wait til TGE. Cannot unstake!"
    },
    {
      code: 6008
      name: "overflowError"
      msg: "overflow"
    },
    {
      code: 6009
      name: "alreadyClaimed"
      msg: "Already claimed"
    },
    {
      code: 6010
      name: "incorrectAuthority"
      msg: "incorrectAuthority"
    },
    {
      code: 6011
      name: "incorrectStakeDetailId"
      msg: "Incorrect Stake detail ID. It must be current stake info id"
    },
    {
      code: 6012
      name: "incorrectLockPeriod"
      msg: "Incorrect Lock Period"
    },
  ]
  types: [
    {
      name: "authority"
      type: {
        kind: "struct"
        fields: [
          {
            name: "admin"
            type: "pubkey"
          },
          {
            name: "pendingAdmin"
            type: "pubkey"
          },
        ]
      }
    },
    {
      name: "eventClaimUnstake"
      type: {
        kind: "struct"
        fields: [
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
            name: "unbondingInfoPda"
            type: "pubkey"
          },
          {
            name: "unbondingInfo"
            type: {
              defined: {
                name: "unbondingInfo"
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
          {
            name: "claimedAt"
            type: "i64"
          },
        ]
      }
    },
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
            name: "stakeCurrencyMint"
            type: "pubkey"
          },
          {
            name: "unbondingPeriod"
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
            name: "vaultConfigPub"
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
            name: "unbondingInfoPda"
            type: "pubkey"
          },
          {
            name: "unbondingInfo"
            type: {
              defined: {
                name: "unbondingInfo"
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
      name: "unbondingInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "id"
            type: "u64"
          },
          {
            name: "amount"
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
          {
            name: "claimed"
            type: "bool"
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
            name: "totalStaked"
            docs: ["total staked"]
            type: "u64"
          },
          {
            name: "stakeCurrencyMint"
            type: "pubkey"
          },
          {
            name: "unbondingPeriod"
            type: "u64"
          },
        ]
      }
    },
  ]
}
