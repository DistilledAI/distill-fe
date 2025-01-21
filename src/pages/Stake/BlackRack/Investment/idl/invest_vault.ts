/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/merkle_airdrop.json`.
 */
export type MerkleAirdrop = {
  address: "GAp8WvZK3LnYNjg1YRuvygnXeaf8y9Dauuprk3MxjP7X"
  metadata: {
    name: "merkleAirdrop"
    version: "0.1.0"
    spec: "0.1.0"
    description: "Created with Anchor"
  }
  instructions: [
    {
      name: "claim"
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "distributor"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  100,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114,
                ]
              },
              {
                kind: "arg"
                path: "randomKp"
              },
            ]
          }
        },
        {
          name: "claimStatus"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [99, 108, 97, 105, 109, 95, 115, 116, 97, 116, 117, 115]
              },
              {
                kind: "account"
                path: "distributor"
              },
              {
                kind: "arg"
                path: "index"
              },
            ]
          }
        },
        {
          name: "distributorTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "distributor"
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
                path: "tokenMint"
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
          name: "signerTokenAccount"
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
                path: "tokenMint"
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
          name: "tokenMint"
          docs: ["The mint to distribute."]
        },
        {
          name: "stakingVault"
          docs: ["CHECK"]
        },
        {
          name: "systemProgram"
          docs: ["The [System] program."]
          address: "11111111111111111111111111111111"
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
          name: "randomKp"
          type: "pubkey"
        },
        {
          name: "index"
          type: "u64"
        },
        {
          name: "amount"
          type: "u64"
        },
        {
          name: "proof"
          type: {
            vec: {
              array: ["u8", 32]
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
          name: "systemProgram"
          address: "11111111111111111111111111111111"
        },
      ]
      args: []
    },
    {
      name: "newDistributor"
      discriminator: [32, 139, 112, 171, 0, 2, 225, 155]
      accounts: [
        {
          name: "signer"
          writable: true
          signer: true
        },
        {
          name: "distributor"
          writable: true
          pda: {
            seeds: [
              {
                kind: "const"
                value: [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
                  95,
                  100,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114,
                ]
              },
              {
                kind: "arg"
                path: "randomKp"
              },
            ]
          }
        },
        {
          name: "distributorTokenAccount"
          writable: true
          pda: {
            seeds: [
              {
                kind: "account"
                path: "distributor"
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
                path: "tokenMint"
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
          name: "signerTokenAccount"
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
                path: "tokenMint"
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
          name: "tokenMint"
          docs: ["The mint to distribute."]
        },
        {
          name: "stakingVault"
          docs: [
            "CHECK staking vault of user. Can be anything, don't matter since it is only used for querying",
          ]
        },
        {
          name: "systemProgram"
          docs: ["The [System] program."]
          address: "11111111111111111111111111111111"
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
          name: "randomKp"
          type: "pubkey"
        },
        {
          name: "root"
          type: {
            array: ["u8", 32]
          }
        },
        {
          name: "maxTotalClaim"
          type: "u64"
        },
        {
          name: "maxNumNodes"
          type: "u64"
        },
      ]
    },
  ]
  accounts: [
    {
      name: "claimStatus"
      discriminator: [22, 183, 249, 157, 247, 95, 150, 96]
    },
    {
      name: "merkleDistributor"
      discriminator: [77, 119, 139, 70, 84, 247, 12, 26]
    },
  ]
  events: [
    {
      name: "claimedEvent"
      discriminator: [144, 172, 209, 86, 144, 87, 84, 115]
    },
    {
      name: "newAirdropEvent"
      discriminator: [196, 28, 48, 102, 124, 17, 36, 253]
    },
  ]
  errors: [
    {
      code: 6000
      name: "invalidProof"
      msg: "Invalid Merkle proof."
    },
    {
      code: 6001
      name: "dropAlreadyClaimed"
      msg: "Drop already claimed."
    },
    {
      code: 6002
      name: "exceededMaxClaim"
      msg: "Exceeded maximum claim amount."
    },
    {
      code: 6003
      name: "exceededMaxNumNodes"
      msg: "Exceeded maximum number of claimed nodes."
    },
    {
      code: 6004
      name: "unauthorized"
      msg: "Account is not authorized to execute this instruction"
    },
    {
      code: 6005
      name: "ownerMismatch"
      msg: "Token account owner did not match intended owner"
    },
  ]
  types: [
    {
      name: "claimStatus"
      type: {
        kind: "struct"
        fields: [
          {
            name: "isClaimed"
            docs: ["If true, the tokens have been claimed."]
            type: "bool"
          },
          {
            name: "claimant"
            docs: ["Authority that claimed the tokens."]
            type: "pubkey"
          },
          {
            name: "claimedAt"
            docs: ["When the tokens were claimed."]
            type: "i64"
          },
          {
            name: "amount"
            docs: ["Amount of tokens claimed."]
            type: "u64"
          },
        ]
      }
    },
    {
      name: "claimedEvent"
      docs: ["Emitted when tokens are claimed."]
      type: {
        kind: "struct"
        fields: [
          {
            name: "index"
            docs: ["Index of the claim."]
            type: "u64"
          },
          {
            name: "rewardToken"
            type: "pubkey"
          },
          {
            name: "stakingVault"
            type: "pubkey"
          },
          {
            name: "randomKp"
            type: "pubkey"
          },
          {
            name: "claimant"
            docs: ["User that claimed."]
            type: "pubkey"
          },
          {
            name: "amount"
            docs: ["Amount of tokens to distribute."]
            type: "u64"
          },
        ]
      }
    },
    {
      name: "merkleDistributor"
      docs: ["State for the account which distributes tokens."]
      type: {
        kind: "struct"
        fields: [
          {
            name: "bump"
            docs: ["Bump seed."]
            type: "u8"
          },
          {
            name: "root"
            docs: ["The 256-bit merkle root."]
            type: {
              array: ["u8", 32]
            }
          },
          {
            name: "rewardToken"
            type: "pubkey"
          },
          {
            name: "stakingVault"
            type: "pubkey"
          },
          {
            name: "randomKp"
            type: "pubkey"
          },
          {
            name: "creator"
            type: "pubkey"
          },
          {
            name: "maxTotalClaim"
            docs: [
              "Maximum number of tokens that can ever be claimed from this [MerkleDistributor].",
            ]
            type: "u64"
          },
          {
            name: "maxNumNodes"
            docs: [
              "Maximum number of nodes that can ever be claimed from this [MerkleDistributor].",
            ]
            type: "u64"
          },
          {
            name: "totalAmountClaimed"
            docs: ["Total amount of tokens that have been claimed."]
            type: "u64"
          },
          {
            name: "numNodesClaimed"
            docs: ["Number of nodes that have been claimed."]
            type: "u64"
          },
        ]
      }
    },
    {
      name: "newAirdropEvent"
      docs: ["Emitted when a new airdrop is created"]
      type: {
        kind: "struct"
        fields: [
          {
            name: "randomKp"
            docs: ["Unique event round"]
            type: "pubkey"
          },
          {
            name: "distributor"
            docs: ["distributor info, since we probably need whitelisting"]
            type: "pubkey"
          },
          {
            name: "rewardToken"
            docs: ["reward token for dapps to paginate"]
            type: "pubkey"
          },
          {
            name: "stakingVault"
            docs: ["staking_vault for dapps to paginate"]
            type: "pubkey"
          },
          {
            name: "creationTimestamp"
            docs: ["also emit creation date for UI display"]
            type: "i64"
          },
        ]
      }
    },
  ]
}
