/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/racks_vault.json`.
 */
export type RacksVault = {
  address: "BLToJKQ2JHQ3NLAdFtyhw9hfQDWEaLnFy1rcCZuJBets"
  metadata: {
    name: "racksVault"
    version: "0.1.0"
    spec: "0.1.0"
    description: "Created with Anchor"
  }
  instructions: [
    {
      name: "buyShare"
      discriminator: [225, 72, 68, 20, 61, 152, 46, 177]
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
          name: "manager"
        },
        {
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
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
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "whitelistDeposit"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                ]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "depositToken"
              },
            ]
          }
        },
        {
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
          writable: true
        },
        {
          name: "depositToken"
        },
        {
          name: "depositorTokenAccount"
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
                path: "depositToken"
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
          name: "depositorShareTokenAccount"
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
                path: "shareToken"
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
          name: "vaultDepositTokenAccount"
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
                path: "depositToken"
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
          name: "sellShareInfoPda"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  101,
                  108,
                  108,
                  95,
                  115,
                  104,
                  97,
                  114,
                  101,
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
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "buyShareArgs"
            }
          }
        },
      ]
    },
    {
      name: "createVault"
      discriminator: [29, 237, 247, 208, 193, 82, 54, 135]
      accounts: [
        {
          name: "payer"
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
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
              },
            ]
          }
        },
        {
          name: "manager"
        },
        {
          name: "vault"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
          writable: true
          signer: true
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
      ]
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "createVaultArgs"
            }
          }
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
          name: "vaultConfig"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
              },
            ]
          }
        },
        {
          name: "manager"
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
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "initializeArgs"
            }
          }
        },
      ]
    },
    {
      name: "managerUpdateAum"
      discriminator: [237, 119, 28, 99, 175, 119, 5, 26]
      accounts: [
        {
          name: "manager"
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
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
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
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
      ]
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "managerUpdateAumArgs"
            }
          }
        },
      ]
    },
    {
      name: "managerWithdraw"
      discriminator: [201, 248, 190, 143, 86, 43, 183, 254]
      accounts: [
        {
          name: "manager"
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
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
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
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "vaultDepositTokenAccount"
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
                path: "depositToken"
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
          name: "managerDepositTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "manager"
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
                path: "depositToken"
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
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
        },
        {
          name: "depositToken"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "managerWithdrawArgs"
            }
          }
        },
      ]
    },
    {
      name: "sellShare"
      discriminator: [7, 52, 139, 219, 156, 100, 88, 209]
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
          name: "manager"
        },
        {
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "manager"
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
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "whitelistDeposit"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                ]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "depositToken"
              },
            ]
          }
        },
        {
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
          writable: true
        },
        {
          name: "depositToken"
        },
        {
          name: "sellerTokenAccount"
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
                path: "depositToken"
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
          name: "sellerShareTokenAccount"
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
                path: "shareToken"
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
          name: "vaultDepositTokenAccount"
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
                path: "depositToken"
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
          name: "sellShareInfoPda"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  101,
                  108,
                  108,
                  95,
                  115,
                  104,
                  97,
                  114,
                  101,
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
          name: "sellShareInfoDetailPda"
          writable: true
        },
        {
          name: "clockSysVar"
          address: "SysvarC1ock11111111111111111111111111111111"
        },
        {
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
        {
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: [
        {
          name: "args"
          type: {
            defined: {
              name: "sellShareArgs"
            }
          }
        },
      ]
    },
    {
      name: "whitelistDeposit"
      discriminator: [143, 172, 171, 182, 132, 5, 52, 70]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "vaultConfig"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116, 95, 99, 111, 110, 102, 105, 103]
              },
              {
                kind: "account"
                path: "signer"
              },
            ]
          }
        },
        {
          name: "authority"
        },
        {
          name: "vault"
          pda: {
            seeds: [
              {
                kind: "const"
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: "account"
                path: "vaultConfig"
              },
              {
                kind: "account"
                path: "shareToken"
              },
            ]
          }
        },
        {
          name: "minter"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  115,
                  104,
                  97,
                  114,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116,
                  101,
                  114,
                ]
              },
            ]
          }
        },
        {
          name: "shareToken"
        },
        {
          name: "depositToken"
        },
        {
          name: "whitelistDeposit"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  119,
                  104,
                  105,
                  116,
                  101,
                  108,
                  105,
                  115,
                  116,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                ]
              },
              {
                kind: "account"
                path: "vault"
              },
              {
                kind: "account"
                path: "depositToken"
              },
            ]
          }
        },
        {
          name: "vaultDepositTokenAccount"
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
                path: "depositToken"
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
          name: "tokenProgram"
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          name: "rent"
          address: "SysvarRent111111111111111111111111111111111"
        },
        {
          name: "associatedTokenProgram"
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
      ]
      args: []
    },
  ]
  accounts: [
    {
      name: "authority"
      discriminator: [36, 108, 254, 18, 167, 144, 27, 36]
    },
    {
      name: "sellShareInfo"
      discriminator: [148, 24, 117, 188, 89, 55, 151, 202]
    },
    {
      name: "sellShareInfoDetail"
      discriminator: [219, 238, 75, 22, 156, 7, 38, 116]
    },
    {
      name: "vault"
      discriminator: [211, 8, 232, 43, 2, 152, 117, 119]
    },
    {
      name: "vaultConfig"
      discriminator: [99, 86, 43, 216, 184, 102, 119, 77]
    },
    {
      name: "whitelistDeposit"
      discriminator: [171, 115, 105, 245, 84, 115, 170, 159]
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
      name: "buyShareArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "amount"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "createVaultArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "version"
            type: "u8"
          },
          {
            name: "initAum"
            type: "u64"
          },
          {
            name: "initNav"
            type: "u64"
          },
          {
            name: "withdrawPeriod"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "initializeArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "managementFee"
            type: "u64"
          },
          {
            name: "performanceFee"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "managerUpdateAumArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "newAum"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "managerWithdrawArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "amount"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "sellShareArgs"
      type: {
        kind: "struct"
        fields: [
          {
            name: "shareAmount"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "sellShareInfo"
      type: {
        kind: "struct"
        fields: [
          {
            name: "id"
            type: "u64"
          },
          {
            name: "user"
            type: "pubkey"
          },
        ]
      }
    },
    {
      name: "sellShareInfoDetail"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "id"
            type: "u64"
          },
          {
            name: "shareAmount"
            type: "u64"
          },
          {
            name: "snapshotNav"
            type: "u64"
          },
          {
            name: "withdrawTime"
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
            name: "shareToken"
            type: "pubkey"
          },
          {
            name: "prevAum"
            type: "u64"
          },
          {
            name: "highestNav"
            type: "u64"
          },
          {
            name: "aum"
            type: "u64"
          },
          {
            name: "nav"
            type: "u64"
          },
          {
            name: "withdrawPeriod"
            type: "u64"
          },
          {
            name: "lastTimeTakeManagementFee"
            type: "u64"
          },
          {
            name: "lastTimeTakePerformanceFee"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "vaultConfig"
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            type: {
              array: ["u8", 1]
            }
          },
          {
            name: "manager"
            type: "pubkey"
          },
          {
            name: "managementFee"
            type: "u64"
          },
          {
            name: "performanceFee"
            type: "u64"
          },
        ]
      }
    },
    {
      name: "whitelistDeposit"
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
            name: "depositToken"
            type: "pubkey"
          },
          {
            name: "depositTokenAccount"
            type: "pubkey"
          },
          {
            name: "isWhitelist"
            type: "bool"
          },
        ]
      }
    },
  ]
}
