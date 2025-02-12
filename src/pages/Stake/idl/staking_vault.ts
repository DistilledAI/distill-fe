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
          name: "pause"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [112, 97, 117, 115, 101]
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
          name: "whitelistVault"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [119, 104, 105, 116, 101, 108, 105, 115, 116]
              },
              {
                kind: "account"
                path: "vault"
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
      name: "configGov"
      discriminator: [233, 152, 214, 136, 68, 52, 63, 43]
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
          name: "vault"
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
          name: "govConfig"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [103, 111, 118, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "vault"
              },
            ]
          }
        },
        {
          name: "stakeCurrencyMint"
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
          name: "weightToCreate"
          type: "u64"
        },
        {
          name: "threshold"
          type: "f64"
        },
        {
          name: "quorum"
          type: "f64"
        },
        {
          name: "votingPeriod"
          type: "i64"
        },
      ]
    },
    {
      name: "createProposal"
      discriminator: [132, 116, 68, 174, 216, 160, 198, 22]
      accounts: [
        {
          name: "creator"
          writable: true
          signer: true
        },
        {
          name: "govConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [103, 111, 118, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "vault"
              },
            ]
          }
        },
        {
          name: "vault"
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
          name: "proposal"
          writable: true
          signer: true
        },
        {
          name: "stakerDetailInfoPda"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                ]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "creator"
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
      ]
      args: [
        {
          name: "unbondingPeriod"
          type: "u64"
        },
        {
          name: "uri"
          type: "string"
        },
        {
          name: "options"
          type: "u8"
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
          name: "whitelistVault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [119, 104, 105, 116, 101, 108, 105, 115, 116]
              },
              {
                kind: "account"
                path: "vault"
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
        {
          name: "endDate"
          type: "i64"
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
          name: "pause"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [112, 97, 117, 115, 101]
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
          name: "whitelistVault"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [119, 104, 105, 116, 101, 108, 105, 115, 116]
              },
              {
                kind: "account"
                path: "vault"
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
          name: "stakerDetailInfoPda"
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
                  101,
                  114,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                ]
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
          name: "pause"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [112, 97, 117, 115, 101]
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
      name: "migrateData"
      discriminator: [118, 173, 228, 79, 30, 79, 8, 10]
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
          name: "staker"
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
                path: "staker"
              },
            ]
          }
        },
        {
          name: "stakerDetailInfoPda"
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
                  101,
                  114,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                ]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "staker"
              },
            ]
          }
        },
        {
          name: "stakeCurrencyMint"
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
      ]
    },
    {
      name: "pauseContract"
      discriminator: [210, 36, 5, 85, 177, 65, 35, 89]
      accounts: [
        {
          name: "signer"
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
          name: "pause"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [112, 97, 117, 115, 101]
              },
            ]
          }
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
      ]
      args: [
        {
          name: "status"
          type: "bool"
        },
      ]
    },
    {
      name: "reallocVaultSize"
      discriminator: [145, 229, 232, 87, 182, 18, 210, 164]
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
      ]
      args: [
        {
          name: "unbondingPeriod"
          type: "u64"
        },
      ]
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
          name: "pause"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [112, 97, 117, 115, 101]
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
          name: "stakerDetailInfoPda"
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
                  101,
                  114,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                ]
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
    {
      name: "updateVault"
      discriminator: [67, 229, 185, 188, 226, 11, 210, 60]
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
          name: "stakeCurrencyMint"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
      ]
      args: [
        {
          name: "unbondingPeriod"
          type: "u64"
        },
        {
          name: "newUnbondingPeriod"
          type: "u64"
        },
        {
          name: "endDate"
          type: "i64"
        },
      ]
    },
    {
      name: "voteProposal"
      discriminator: [247, 104, 114, 240, 237, 41, 200, 36]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "vault"
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
          name: "proposal"
          writable: true
        },
        {
          name: "stakerDetailInfoPda"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  116,
                  97,
                  107,
                  101,
                  114,
                  95,
                  100,
                  101,
                  116,
                  97,
                  105,
                  108,
                  95,
                  105,
                  110,
                  102,
                  111,
                ]
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
          name: "stakeCurrencyMint"
        },
        {
          name: "voter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 111, 116, 101, 114]
              },
              {
                kind: "account"
                path: "proposal"
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
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
          name: "option"
          type: "u8"
        },
      ]
    },
    {
      name: "whitelist"
      discriminator: [0, 143, 193, 93, 69, 29, 183, 140]
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
          name: "vault"
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
          name: "whitelistVault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [119, 104, 105, 116, 101, 108, 105, 115, 116]
              },
              {
                kind: "account"
                path: "vault"
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
      ]
      args: [
        {
          name: "unbondingPeriod"
          type: "u64"
        },
        {
          name: "status"
          type: "bool"
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
      name: "govConfig"
      discriminator: [25, 158, 54, 41, 143, 227, 58, 104]
    },
    {
      name: "pause"
      discriminator: [168, 183, 252, 225, 28, 17, 138, 174]
    },
    {
      name: "proposal"
      discriminator: [26, 94, 189, 187, 116, 136, 53, 33]
    },
    {
      name: "stakerDetailInfo"
      discriminator: [118, 205, 244, 221, 75, 143, 110, 148]
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
    {
      name: "voter"
      discriminator: [241, 93, 35, 191, 254, 147, 17, 202]
    },
    {
      name: "whitelistVault"
      discriminator: [179, 240, 242, 156, 206, 64, 241, 221]
    },
  ]
  events: [
    {
      name: "eventClaimUnstake"
      discriminator: [99, 54, 74, 147, 119, 120, 100, 23]
    },
    {
      name: "eventCreateProposal"
      discriminator: [237, 63, 210, 183, 153, 19, 86, 63]
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
    {
      name: "eventVoteProposal"
      discriminator: [105, 232, 100, 114, 16, 6, 49, 58]
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
    {
      code: 6013
      name: "paused"
      msg: "paused"
    },
    {
      code: 6014
      name: "cannotUnstake"
      msg: "Cannot unstake"
    },
    {
      code: 6015
      name: "stakingEnded"
      msg: "Stake end"
    },
    {
      code: 6016
      name: "notEnoughVotingPower"
      msg: "Not enough voting power"
    },
    {
      code: 6017
      name: "numOptionToLarge"
      msg: "Support max 8 options"
    },
    {
      code: 6018
      name: "proposalEnded"
      msg: "Proposal has been ended"
    },
    {
      code: 6019
      name: "invalidOption"
      msg: "Invalid option"
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
      name: "eventCreateProposal"
      type: {
        kind: "struct"
        fields: [
          {
            name: "proposal"
            type: "pubkey"
          },
          {
            name: "creator"
            type: "pubkey"
          },
          {
            name: "vault"
            type: "pubkey"
          },
          {
            name: "createdTime"
            type: "i64"
          },
          {
            name: "expirationTime"
            type: "i64"
          },
          {
            name: "uri"
            type: "string"
          },
          {
            name: "options"
            type: "u8"
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
      name: "eventVoteProposal"
      type: {
        kind: "struct"
        fields: [
          {
            name: "proposal"
            type: "pubkey"
          },
          {
            name: "voter"
            type: "pubkey"
          },
          {
            name: "votedTime"
            type: "i64"
          },
          {
            name: "option"
            type: "u8"
          },
          {
            name: "weight"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "govConfig"
      type: {
        kind: "struct"
        fields: [
          {
            name: "weightToCreate"
            type: "u64"
          },
          {
            name: "threshold"
            type: "f64"
          },
          {
            name: "quorum"
            type: "f64"
          },
          {
            name: "votingPeriod"
            type: "i64"
          },
        ]
      }
    },
    {
      name: "pause"
      type: {
        kind: "struct"
        fields: [
          {
            name: "paused"
            type: "bool"
          },
        ]
      }
    },
    {
      name: "proposal"
      type: {
        kind: "struct"
        fields: [
          {
            name: "proposal"
            type: "pubkey"
          },
          {
            name: "creator"
            type: "pubkey"
          },
          {
            name: "vault"
            type: "pubkey"
          },
          {
            name: "createdTime"
            type: "i64"
          },
          {
            name: "expirationTime"
            type: "i64"
          },
          {
            name: "uri"
            type: "string"
          },
          {
            name: "options"
            type: "u8"
          },
          {
            name: "voteCount"
            type: {
              vec: "u64"
            }
          },
          {
            name: "totalStaked"
            type: "u64"
          },
          {
            name: "threshold"
            type: "f64"
          },
          {
            name: "quorum"
            type: "f64"
          },
        ]
      }
    },
    {
      name: "stakerDetailInfo"
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
          {
            name: "vault"
            type: "pubkey"
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
            name: "stakeCurrencyMint"
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
          {
            name: "endDate"
            type: "i64"
          },
        ]
      }
    },
    {
      name: "voter"
      type: {
        kind: "struct"
        fields: [
          {
            name: "proposal"
            type: "pubkey"
          },
          {
            name: "voter"
            type: "pubkey"
          },
          {
            name: "votedTime"
            type: "i64"
          },
          {
            name: "option"
            type: "u8"
          },
          {
            name: "weight"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "whitelistVault"
      type: {
        kind: "struct"
        fields: [
          {
            name: "whitelisted"
            type: "bool"
          },
          {
            name: "vault"
            type: "pubkey"
          },
        ]
      }
    },
  ]
}
